import { Request, Response } from "express";
import { Controller } from "../decorators/http/controller";
import { Delete, Get, Post, Put } from "../decorators/http/methods";
import { RouteResponse } from "../common/http-responses";
import { clienteRepository } from "../repositories/Cliente";

@Controller("/cliente")
export class ClienteController {
  /**
   * @swagger
   * /cliente/list:
   *   get:
   *     summary: Retorna uma lista paginada de fornecedores
   *     tags: [Cliente]
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
   *         description: Lista de clientes
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Cliente'
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
    const [data, total] = await clienteRepository.findAndCount({
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
   * /cliente/{id}:
   *   get:
   *     summary: Retorna um cliente pelo ID
   *     tags: [Cliente]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do cliente
   *     responses:
   *       200:
   *         description: Cliente encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Cliente'
   *       404:
   *         description: Cliente não encontrado
   */
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

  /**
   * @swagger
   * /cliente/create:
   *   post:
   *     summary: Cria um novo cliente
   *     tags: [Cliente]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Cliente'
   *     responses:
   *       200:
   *         description: Cliente criado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Cliente'
   */

  @Post("/create")
  async create(req: Request, res: Response): Promise<void> {
    const cliente = await clienteRepository.create(req.body);
    return RouteResponse.success(res, cliente);
  }

  /**
   * @swagger
   * /cliente/{id}:
   *   put:
   *     summary: Atualiza um cliente pelo ID
   *     tags: [Cliente]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do cliente
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Cliente'
   *     responses:
   *       200:
   */

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

  /**
   * @swagger
   * /cliente/{id}:
   *   delete:
   *     summary: Deleta um cliente pelo ID
   *     tags: [Cliente]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do cliente
   *     responses:
   *       200:
   *         description: Cliente
   */

  @Delete("/:id")
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    await clienteRepository.delete(id);
    return RouteResponse.successEmpty(res);
  }
}
