import { Request, Response } from "express";
import { Controller } from "../decorators/http/controller";
import { Delete, Get, Post, Put } from "../decorators/http/methods";
import { RouteResponse } from "../common/http-responses";
import { FornecedorRepository } from "../repositories/Fornecedor";

@Controller("/fornecedor")
export class FornecedorController {
  /**
   * @swagger
   * /fornecedor/list:
   *   get:
   *     summary: Retorna uma lista paginada de fornecedores
   *     tags: [Fornecedor]
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
   *         description: Lista de fornecedores
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Fornecedor'
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
    // Extrai os parâmetros de paginação da query string
    const repo = FornecedorRepository;
    const page = parseInt(req.query.page as string) || 1; // Página padrão: 1
    const limit = parseInt(req.query.limit as string) || 10; // Limite padrão: 10

    // Calcula o número de itens a serem ignorados
    const skip = (page - 1) * limit;

    // Busca os dados paginados e o total de registros
    const [data, total] = await repo.findAndCount({
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
   * /fornecedor/{id}:
   *   get:
   *     summary: Retorna um fornecedor pelo ID
   *     tags: [Fornecedor]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID do Fornecedor
   *     responses:
   *       200:
   *         description: Fornecedor encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Fornecedor'
   *       404:
   *         description: Fornecedor não encontrado
   */

  @Get("/:id")
  async getOne(req: Request, res: Response): Promise<void> {
    const Fornecedor = await FornecedorRepository.findOneBy({
      id: req.params.id,
    });
    if (Fornecedor) {
      return RouteResponse.success(res, Fornecedor);
    } else {
      return RouteResponse.notFound(res, "Fornecedor não encontrado");
    }
  }

  /**
   * @swagger
   * /fornecedor/create:
   *   post:
   *     summary: Cria um novo fornecedor
   *     tags: [Fornecedor]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Fornecedor'
   *     responses:
   *       201:
   *         description: Fornecedor criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Fornecedor'
   */

  @Post("/create")
  async create(req: Request, res: Response): Promise<void> {
    const Fornecedor = FornecedorRepository.create(req.body);
    await FornecedorRepository.save(Fornecedor);
    return RouteResponse.success(res, Fornecedor);
  }
  /**
   * @swagger
   * /fornecedor/{id}:
   *   put:
   *     summary: Atualiza um fornecedor pelo ID
   *     tags: [Fornecedor]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID do fornecedor
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Fornecedor'
   *     responses:
   *       200:
   *         description: Fornecedor atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Fornecedor'
   *       404:
   *         description: Fornecedor não encontrado
   */
  @Put("/:id")
  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    await FornecedorRepository.update(id, req.body);
    const updatedFornecedor = await FornecedorRepository.findOneBy({
      id: req.params.id,
    });
    if (updatedFornecedor) {
      return RouteResponse.success(res, updatedFornecedor);
    } else {
      return RouteResponse.notFound(res, "Fornecedor não encontrado");
    }
  }
  /**
   * @swagger
   * /fornecedor/{id}:
   *   delete:
   *     summary: Exclui um fornecedor pelo ID
   *     tags: [Fornecedor]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID do fornecedor
   *     responses:
   *       204:
   *         description: Fornecedor excluído com sucesso
   *       404:
   *         description: Fornecedor não encontrado
   */
  @Delete("/:id")
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    await FornecedorRepository.delete(id);
    return RouteResponse.successEmpty(res);
  }
}
