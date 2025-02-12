import { Request, Response } from "express";
import { Controller } from "../decorators/http/controller";
import { Delete, Get, Post, Put } from "../decorators/http/methods";
import { RouteResponse } from "../common/http-responses";
import { clienteRepository } from "../repositories/Cliente";

@Controller("/cliente")
export class ClienteController {
  @Get("/list")
  async getAll(req: Request, res: Response): Promise<void> {
    const cliente = await clienteRepository.find();
    return RouteResponse.success(res, cliente);
  }

  @Get("/:id")
  async getOne(req: Request, res: Response): Promise<void> {
    const cliente = await clienteRepository.findOneBy({
      id: req.params.id,
    });
    if (cliente) {
      return RouteResponse.success(res, cliente);
    } else {
      return RouteResponse.notFound(res, "Classificação não encontrada");
    }
  }

  @Post("/create")
  async create(req: Request, res: Response): Promise<void> {
    const cliente = await clienteRepository.create(req.body);
    return RouteResponse.success(res, cliente);
  }

  @Put("/:id")
  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const cliente = await clienteRepository.update(id, req.body);
    if (cliente) {
      return RouteResponse.success(res, cliente);
    } else {
      return RouteResponse.notFound(res, "Classificação não encontrada");
    }
  }

  @Delete("/:id")
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    await clienteRepository.delete(id);
    return RouteResponse.successEmpty(res);
  }
}
