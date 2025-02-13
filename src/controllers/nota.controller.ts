import { Controller } from "../decorators/http/controller";
import { Delete, Get, Post, Put } from "../decorators/http/methods";
import { Request, Response } from "express";
import { RouteResponse } from "../common/http-responses";
import { notaRepository } from "../repositories/Nota";
import { notaProdutoRepository } from "../repositories/NotaProduto";

@Controller("/nota")
export class notaController {
  /**
   * @swagger
   * /nota/list:
   *   get:
   *     summary: Retorna uma lista paginada de notas
   *     tags: [Nota]
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
   *         description: Lista de notas
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Nota'
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
    const [data, total] = await notaRepository.findAndCount({
      relations: ["cliente", "obra", "produtos", "produtos.produto"],
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
   * /nota/{id}:
   *   get:
   *     summary: Retorna uma nota pelo ID
   *     tags: [Nota]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID da nota
   *     responses:
   *       200:
   *         description: Nota encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Nota'
   *       404:
   *         description: Nota não encontrada
   */

  @Get("/:id")
  async getOne(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const nota = await notaRepository.findOne({
      where: { id },
      relations: ["cliente", "obra", "produtos", "produtos.produto"],
    });
    if (nota) {
      return RouteResponse.success(res, nota);
    } else {
      return RouteResponse.notFound(res, "nota não encontrado");
    }
  }

  /**
   * @swagger
   * /nota/create:
   *   post:
   *     summary: Cria uma nova nota
   *     tags: [Nota]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Nota'
   *     responses:
   *       200:
   *         description: Nota criada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Nota'
   */

  @Post("/create")
  async create(req: Request, res: Response): Promise<void> {
    const nota = notaRepository.create(req.body);
    await notaRepository.save(nota);

    for (const produtoData of req.body.produtos_nota) {
      const notaProduto = notaProdutoRepository.create({
        ...produtoData,
        nota: nota[0].id,
      });
      await notaProdutoRepository.save(notaProduto);
    }

    return RouteResponse.success(res, nota);
  }

  /**
   * @swagger
   * /nota/{id}:
   *   put:
   *     summary: Atualiza uma nota pelo ID
   *     tags: [Nota]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID da nota
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Nota'
   *     responses:
   *       200:
   *         description: Nota atualizada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Nota'
   *       404:
   *         description: Nota não encontrada
   */

  @Put("/:id")
  async update(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
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

  /**
   * @swagger
   * /nota/{id}:
   *   delete:
   *     summary: Deleta uma nota pelo ID
   *     tags: [Nota]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID da nota
   *     responses:
   *       200:
   *         description: Nota deletada
   *       404:
   *         description: Nota não encontrada
   */

  @Delete("/:id")
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    await notaRepository.delete(id);
    return RouteResponse.successEmpty(res);
  }
}
