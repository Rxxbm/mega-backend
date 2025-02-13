import { Controller } from "../decorators/http/controller";
import { Delete, Get, Post, Put } from "../decorators/http/methods";
import { Request, Response } from "express";
import { RouteResponse } from "../common/http-responses";
import { aluguelRepository } from "../repositories/Aluguel";
import { aluguelProdutoRepository } from "../repositories/AluguelProduto";

@Controller("/aluguel")
export class AluguelController {
  /**
   * @swagger
   * /aluguel/list:
   *   get:
   *     summary: Retorna uma lista paginada de alugueis
   *     tags: [Aluguel]
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
   *         description: Lista de alugueis
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Aluguel'
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
    const aluguel = await aluguelRepository.find({
      relations: ["cliente", "obra", "produtos", "produtos.produto"],
    });
    return RouteResponse.success(res, aluguel);
  }

  /**
   * @swagger
   * /aluguel/{id}:
   *   get:
   *     summary: Retorna um aluguel pelo ID
   *     tags: [Aluguel]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do aluguel
   *     responses:
   *       200:
   *         description: Aluguel encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Aluguel'
   *       404:
   *         description: Aluguel não encontrado
   */

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

  /**
   * @swagger
   * /aluguel/create:
   *   post:
   *     summary: Cria um novo aluguel
   *     tags: [Aluguel]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Aluguel'
   *     responses:
   *       200:
   *         description: Aluguel criado
   */

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

  /**
   * @swagger
   * /aluguel/{id}:
   *   put:
   *     summary: Atualiza um aluguel
   *     tags: [Aluguel]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do aluguel
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Aluguel'
   *     responses:
   *       200:
   *         description: Aluguel atualizado
   */

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

  /**
   * @swagger
   * /aluguel/{id}:
   *   delete:
   *     summary: Deleta um aluguel pelo ID
   *     tags: [Aluguel]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do aluguel
   */

  @Delete("/:id")
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    await aluguelRepository.delete(id);
    return RouteResponse.successEmpty(res);
  }
}
