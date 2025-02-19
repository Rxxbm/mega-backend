import { Request, Response } from "express";
import { Controller } from "../decorators/http/controller";
import { Delete, Get, Post, Put } from "../decorators/http/methods";
import { RouteResponse } from "../common/http-responses";
import { classificacaoRepository } from "../repositories/Classificacao";
import { Middleware } from "../decorators/http/middleware";
import { ClassificacaoNotExists } from "../middlewares/classificacao/ClassificacaoNotExists";
import { ValidatedDTO } from "../config/dto";
import { CreateCategoriaDTO } from "../dtos/CreateCategoriaDTO";

@Controller("/classificacao")
export class classificacaoController {
  /**
   * @swagger
   * /classificacao/list:
   *   get:
   *     summary: Retorna uma lista paginada de classificacao
   *     tags: [Classificacao]
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
   *         description: Lista de classificacao
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Classificacao'
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
    const [data, total] = await classificacaoRepository.findAndCount({
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
   * /classificacao/{id}:
   *   get:
   *     summary: Retorna uma classificação pelo ID
   *     tags: [Classificacao]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID da classificação
   *     responses:
   *       200:
   *         description: Classificação encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Classificacao'
   *       404:
   *         description: Classificação não encontrada
   */

  @Get("/:id")
  @Middleware(ClassificacaoNotExists)
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

  /**
   * @swagger
   * /classificacao/create:
   *   post:
   *     summary: Cria uma nova classificação
   *     tags: [Classificacao]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Classificacao'
   *     responses:
   *       201:
   *         description: Classificação criada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Classificacao'
   */

  @Post("/create")
  @ValidatedDTO(CreateCategoriaDTO)
  async create(req: Request, res: Response): Promise<void> {
    const classificacao = classificacaoRepository.create(req.body);
    await classificacaoRepository.save(classificacao);
    return RouteResponse.successCreated(res, classificacao);
  }

  /**
   * @swagger
   * /classificacao/{id}:
   *   put:
   *     summary: Atualiza uma classificação pelo ID
   *     tags: [Classificacao]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID da classificação
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Classificacao'
   *     responses:
   *       200:
   *         description: Classificação atualizada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Classificacao'
   */

  @Put("/:id")
  @Middleware(ClassificacaoNotExists)
  async update(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const classificacao = await classificacaoRepository.update(id, req.body);
    const newClassificacao = await classificacaoRepository.findOneBy({
      id: id,
    });
    if (classificacao) {
      return RouteResponse.success(res, newClassificacao);
    } else {
      return RouteResponse.notFound(res, "Classificação não encontrada");
    }
  }

  /**
   * @swagger
   * /classificacao/{id}:
   *   delete:
   *     summary: Deleta uma classificação pelo ID
   *     tags: [Classificacao]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID da classificação
   *     responses:
   *       204:
   *         description: Classificacao deletada com sucesso
   */

  @Delete("/:id")
  @Middleware(ClassificacaoNotExists)
  async delete(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    await classificacaoRepository.delete(id);
    return RouteResponse.successEmpty(res);
  }
}
