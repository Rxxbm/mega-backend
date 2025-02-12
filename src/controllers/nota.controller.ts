import { Controller } from "../decorators/http/controller";
import { Delete, Get, Post, Put } from "../decorators/http/methods";
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { RouteResponse } from "../common/http-responses";
import { Nota } from "../entities/Nota";
import { ProdutoNota } from "../entities/ProdutoNota";
import { notaRepository } from "../repositories/Nota";
import { notaProdutoRepository } from "../repositories/NotaProduto";

@Controller("/nota")
export class notaController {
  @Get("/list")
  async getAll(req: Request, res: Response): Promise<void> {
    const nota = await notaRepository.find({
      relations: ["cliente", "obra", "produtos", "produtos.produto"],
    });
    return RouteResponse.success(res, nota);
  }

  @Get("/:id")
  async getOne(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const nota = await notaRepository.findOne({
      where: { id: id },
      relations: ["cliente", "obra", "produtos", "produtos.produto"],
    });
    if (nota) {
      return RouteResponse.success(res, nota);
    } else {
      return RouteResponse.notFound(res, "nota não encontrado");
    }
  }

  @Post("/create")
  async create(req: Request, res: Response): Promise<void> {
    const nota = await notaRepository.create(req.body);
    await notaRepository.save(nota);

    for (const produtoData of req.body.produtos) {
      const notaProduto = notaProdutoRepository.create({
        ...produtoData,
        nota,
      });
      await notaProdutoRepository.save(notaProduto);
    }

    return RouteResponse.success(res, nota);
  }

  @Put("/:id")
  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const notaData = req.body;

    const nota = await notaRepository.findOne({
      where: { id },
      relations: ["produtos"],
    });
    if (!nota) return RouteResponse.notFound(res, "nota não encontrado");

    notaRepository.merge(nota, notaData);
    await notaRepository.save(nota);

    // Remove produtos existentes e cria os novos
    await notaProdutoRepository.delete({ nota });
    for (const produtoData of notaData.produtos) {
      const notaProduto = notaProdutoRepository.create({
        ...produtoData,
        nota,
      });
      await notaProdutoRepository.save(notaProduto);
    }

    return RouteResponse.success(res, nota);
  }

  @Delete("/:id")
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    await notaRepository.delete(id);
    return RouteResponse.successEmpty(res);
  }
}
