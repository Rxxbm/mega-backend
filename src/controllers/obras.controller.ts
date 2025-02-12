import { Request, Response } from "express";
import { Controller } from "../decorators/http/controller";
import { Delete, Get, Post, Put } from "../decorators/http/methods";
import { RouteResponse } from "../common/http-responses";
import { obrasRepository } from "../repositories/Obras";

@Controller("/obras")
export class ObrasController {
  @Get("/list")
  async getAll(req: Request, res: Response): Promise<void> {
    const obras = await obrasRepository.find();
    return RouteResponse.success(res, obras);
  }

  @Get("/:id")
  async getOne(req: Request, res: Response): Promise<void> {
    const obras = await obrasRepository.findOneBy({
      id: req.params.id,
    });
    if (obras) {
      return RouteResponse.success(res, obras);
    } else {
      return RouteResponse.notFound(res, "Classificação não encontrada");
    }
  }

  @Post("/create")
  async create(req: Request, res: Response): Promise<void> {
    const obras = await obrasRepository.create(req.body);
    return RouteResponse.success(res, obras);
  }

  @Put("/:id")
  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const obras = await obrasRepository.update(id, req.body);
    if (obras) {
      return RouteResponse.success(res, obras);
    } else {
      return RouteResponse.notFound(res, "Classificação não encontrada");
    }
  }

  @Delete("/:id")
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    await obrasRepository.delete(id);
    return RouteResponse.successEmpty(res);
  }
}
