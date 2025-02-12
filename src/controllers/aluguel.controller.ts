import { Controller } from "../decorators/http/controller";
import { Delete, Get, Post, Put } from "../decorators/http/methods";
import { Request, Response } from "express";
import { RouteResponse } from "../common/http-responses";
import { aluguelRepository } from "../repositories/Aluguel";
import { aluguelProdutoRepository } from "../repositories/AluguelProduto";

@Controller("/aluguel")
export class AluguelController {
  @Get("/list")
  async getAll(req: Request, res: Response): Promise<void> {
    const aluguel = await aluguelRepository.find({
      relations: ["cliente", "obra", "produtos", "produtos.produto"],
    });
    return RouteResponse.success(res, aluguel);
  }

  @Get("/:id")
  async getOne(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const aluguel = await aluguelRepository.findOne({
      where: { id: id.toString() },
      relations: ["cliente", "obra", "produtos", "produtos.produto"],
    });
    if (aluguel) {
      return RouteResponse.success(res, aluguel);
    } else {
      return RouteResponse.notFound(res, "Aluguel não encontrado");
    }
  }

  @Post("/create")
  async create(req: Request, res: Response): Promise<void> {
    const aluguel = aluguelRepository.create(req.body);
    await aluguelRepository.save(aluguel);

    for (const produtoData of req.body.produtos) {
      const aluguelProduto = aluguelProdutoRepository.create({
        ...produtoData,
        aluguel,
      });
      await aluguelProdutoRepository.save(aluguelProduto);
    }

    return RouteResponse.success(res, aluguel);
  }

  @Put("/:id")
  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const aluguelData = req.body;

    const aluguel = await aluguelRepository.findOne({
      where: { id: id.toString() },
      relations: ["produtos"],
    });
    if (!aluguel) return RouteResponse.notFound(res, "Aluguel não encontrado");

    aluguelRepository.merge(aluguel, aluguelData);
    await aluguelRepository.save(aluguel);

    // Remove produtos existentes e cria os novos
    await aluguelProdutoRepository.delete({ aluguel });
    for (const produtoData of aluguelData.produtos) {
      const aluguelProduto = aluguelProdutoRepository.create({
        ...produtoData,
        aluguel,
      });
      await aluguelProdutoRepository.save(aluguelProduto);
    }

    return RouteResponse.success(res, aluguel);
  }

  @Delete("/:id")
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    await aluguelRepository.delete(id);
    return RouteResponse.successEmpty(res);
  }
}
