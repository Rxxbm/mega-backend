import { Request, Response } from "express";
import { Controller } from "../decorators/http/controller";
import { Delete, Get, Post, Put } from "../decorators/http/methods";
import { RouteResponse } from "../common/http-responses";
import { classificacaoRepository } from "../repositories/Classificacao";

@Controller("/classificacao")
export class classificacaoController {
  @Get("/list")
  async getAll(req: Request, res: Response): Promise<void> {
    const classificacao = await classificacaoRepository.find();
    return RouteResponse.success(res, classificacao);
  }

  @Get("/:id")
  async getOne(req: Request, res: Response): Promise<void> {
    const classificacao = await classificacaoRepository.findOneBy({
      id: req.params.id,
    });
    if (classificacao) {
      return RouteResponse.success(res, classificacao);
    } else {
      return RouteResponse.notFound(res, "Classificação não encontrada");
    }
  }

  @Post("/create")
  async create(req: Request, res: Response): Promise<void> {
    const classificacao = await classificacaoRepository.create(req.body);
    return RouteResponse.success(res, classificacao);
  }

  @Put("/:id")
  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const classificacao = await classificacaoRepository.update(id, req.body);
    if (classificacao) {
      return RouteResponse.success(res, classificacao);
    } else {
      return RouteResponse.notFound(res, "Classificação não encontrada");
    }
  }

  @Delete("/:id")
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    await classificacaoRepository.delete(id);
    return RouteResponse.successEmpty(res);
  }
}
