import { Request, Response } from "express";
import { Controller } from "../decorators/http/controller";
import { Delete, Get, Post, Put } from "../decorators/http/methods";
import { RouteResponse } from "../common/http-responses";
import { produtoRepository } from "../repositories/Produto";

@Controller("/produto")
export class ProdutoController {
  /**
   * @swagger
   * /produto/list:
   *   get:
   *     summary: Retorna uma lista paginada de produtos
   *     tags: [Produto]
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
   *         description: Lista de produto
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Produto'
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
    const [data, total] = await produtoRepository.findAndCount({
      skip,
      take: limit,
    });

    // Retorna os dados e metadados de paginação
    return RouteResponse.success(res, {
      ...data,
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
   * /produto/{id}:
   *   get:
   *     summary: Retorna uma obra pelo ID
   *     tags: [Produto]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da obra
   *     responses:
   *       200:
   *         description: Obra encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Produto'
   *       404:
   *         description: Obra não encontrada
   */

  @Get("/:id")
  async getOne(req: Request, res: Response): Promise<void> {
    const produto = await produtoRepository.findOneBy({
      id: req.params.id,
    });
    if (produto) {
      return RouteResponse.success(res, produto);
    } else {
      return RouteResponse.notFound(res, "Produto não encontrada");
    }
  }

  /**
   * @swagger
   * /produto/create:
   *   post:
   *     summary: Cria uma nova obra
   *     tags: [Produto]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Produto'
   *     responses:
   *       200:
   *         description: Obra criada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Produto'
   */

  @Post("/create")
  async create(req: Request, res: Response): Promise<void> {
    const produto = await produtoRepository.create(req.body);
    return RouteResponse.success(res, produto);
  }

  /**
   * @swagger
   * /produto/{id}:
   *   put:
   *     summary: Atualiza uma obra pelo ID
   *     tags: [Produto]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da obra
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Produto'
   *     responses:
   *       200:
   *         description: Obra atualizada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Produto'
   *       404:
   *         description: Obra não encontrada
   */

  @Put("/:id")
  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const produto = await produtoRepository.update(id, req.body);
    if (produto) {
      return RouteResponse.success(res, produto);
    } else {
      return RouteResponse.notFound(res, "Produto não encontrado");
    }
  }

  /**
   * @swagger
   * /produto/{id}:
   *   delete:
   *     summary: Deleta uma obra pelo ID
   *     tags: [Produto]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
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
    const id = parseInt(req.params.id);
    await produtoRepository.delete(id);
    return RouteResponse.successEmpty(res);
  }
}
