import { Request, Response } from "express";
import { Controller } from "../decorators/http/controller";
import { Delete, Get, Post, Put } from "../decorators/http/methods";
import { RouteResponse } from "../common/http-responses";
import { obrasRepository } from "../repositories/Obras";

@Controller("/obras")
export class ObrasController {
  /**
   * @swagger
   * /obras/list:
   *   get:
   *     summary: Retorna uma lista paginada de obras
   *     tags: [Obras]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *         description: Número da página
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *         description: Número de itens por página
   *     responses:
   *       200:
   *         description: Lista de obras
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Obras'
   *                 meta:
   *                   type: object
   *                   properties:
   *                     page:
   *                       type: integer
   *                     limit:
   *                       type: integer
   *                     total:
   *                       type: integer
   *                     totalPages:
   *                       type: integer
   */
  @Get("/list")
  async getAll(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1; // Página padrão: 1
    const limit = parseInt(req.query.limit as string) || 10; // Limite padrão: 10

    // Calcula o número de itens a serem ignorados
    const skip = (page - 1) * limit;

    // Busca os dados paginados e o total de registros
    const [data, total] = await obrasRepository.findAndCount({
      skip,
      take: limit,
    });

    // Retorna os dados e metadados de paginação
    return RouteResponse.success(res, {
      result: data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  }

  /**
   * @swagger
   * /obras/{id}:
   *   get:
   *     summary: Retorna uma obra pelo ID
   *     tags: [Obras]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID da obra
   *     responses:
   *       200:
   *         description: Obra encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Obras'
   *       404:
   *         description: Obra não encontrada
   */

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

  /**
   * @swagger
   * /obras/create:
   *   post:
   *     summary: Cria uma nova obra
   *     tags: [Obras]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Obras'
   *     responses:
   *       200:
   *         description: Obra criada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Obras'
   */

  @Post("/create")
  async create(req: Request, res: Response): Promise<void> {
    const obras = obrasRepository.create(req.body);
    await obrasRepository.save(obras);
    return RouteResponse.success(res, obras);
  }

  /**
   * @swagger
   * /obras/{id}:
   *   put:
   *     summary: Atualiza uma obra pelo ID
   *     tags: [Obras]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID da obra
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Obras'
   *     responses:
   *       200:
   *         description: Obra atualizada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Obras'
   *       404:
   *         description: Obra não encontrada
   */

  @Put("/:id")
  async update(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const obras = await obrasRepository.update(id, req.body);
    if (obras) {
      return RouteResponse.success(res, obras);
    } else {
      return RouteResponse.notFound(res, "Classificação não encontrada");
    }
  }

  /**
   * @swagger
   * /obras/{id}:
   *   delete:
   *     summary: Deleta uma obra pelo ID
   *     tags: [Obras]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID da obra
   *     responses:
   *       200:
   *         description: Obra deletada
   *       404:
   *         description: Obra não encontrada
   */

  @Delete("/:id")
  async delete(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    await obrasRepository.delete(id);
    return RouteResponse.successEmpty(res);
  }
}
