import { Controller } from "../decorators/http/controller";
import { Delete, Get, Post, Put } from "../decorators/http/methods";
import { Request, Response } from "express";
import { RouteResponse } from "../common/http-responses";
import { aluguelRepository } from "../repositories/Aluguel";
import { Aluguel } from "../entities/Aluguel";
import { aluguelProdutoRepository } from "../repositories/AluguelProduto";
import { notaRepository } from "../repositories/Nota";
import { plainToInstance } from "class-transformer"; // Import necessário

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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Busca os alugueis com paginação
    const [alugueis, total] = await aluguelRepository.findAndCount({
      skip,
      take: limit,
    });

    // Busca os produtos e notas associadas aos alugueis
    const dados = await Promise.all(
      alugueis.map(async (alugue) => {
        // Converter para um objeto plano (evita problemas de serialização)
        const aluguelJson = plainToInstance(Object, alugue);

        // Buscar os produtos do aluguel
        const aluguelProdutos = await aluguelProdutoRepository.find({
          relations: ["produto"],
          where: { aluguel: { id: alugue.id } },
        });

        // Buscar as notas do aluguel
        const notas = await notaRepository.find({
          where: { aluguel: { id: alugue.id } },
        });

        return {
          ...aluguelJson, // Agora, aluguel pode ser espalhado corretamente
          produtos: aluguelProdutos.map((ap) => ({
            id: ap.produto.id,
            nome: ap.produto.nome,
            preco: ap.produto.preco,
            quantidade: ap.quantidade,
            preco_unitario: ap.preco_unitario,
            unidade: ap.produto.unidade,
            indenizacao: ap.produto.indenizacao,
          })),
          notas,
        };
      })
    );

    return RouteResponse.success(res, {
      result: dados,
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
   * /aluguel/{id}:
   *   get:
   *     summary: Retorna um aluguel pelo ID
   *     tags: [Aluguel]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
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
    const id = req.params.id;

    // Busca o aluguel pelo ID com as relações necessárias
    const aluguel = await aluguelRepository.findOne({
      where: { id: id.toString() },
    });

    // Se não encontrar, retorna erro
    if (!aluguel) return RouteResponse.notFound(res, "Aluguel não encontrado");

    // Converter para um objeto plano (evita problemas de serialização)
    const aluguelJson = plainToInstance(Object, aluguel);

    // Buscar os produtos do aluguel
    const aluguelProdutos = await aluguelProdutoRepository.find({
      where: {
        aluguel: {
          id: aluguel.id,
        },
      },
      relations: ["produto", "aluguel"],
    });

    // Buscar as notas associadas ao aluguel
    const notas = await notaRepository.find({
      where: { aluguel: { id: aluguel.id } },
    });

    // Monta a resposta com os produtos e notas
    const aluguelComProdutosENotas = {
      ...aluguelJson,
      produtos: aluguelProdutos.map((ap) => ({
        id: ap.produto.id,
        nome: ap.produto.nome,
        preco: ap.produto.preco,
        quantidade: ap.quantidade,
        preco_unitario: ap.preco_unitario,
        unidade: ap.produto.unidade,
        indenizacao: ap.produto.indenizacao,
      })),
      notas,
    };

    return RouteResponse.success(res, aluguelComProdutosENotas);
  }

  /**
   * @swagger
   * /aluguel/{id}/notas:
   *   get:
   *     summary: Retorna notas associadas a um aluguel pelo ID
   *     tags: [Aluguel]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID do aluguel
   *     responses:
   *       200:
   *         description: Nota encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Aluguel'
   *       404:
   *         description: Aluguel não encontrado
   */

  @Get("/:id/notas")
  async getOneByNotas(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    // Busca o aluguel pelo ID com as relações necessárias
    const aluguel = await aluguelRepository.findOne({
      where: { id: id.toString() },
    });

    // Se não encontrar, retorna erro
    if (!aluguel) return RouteResponse.notFound(res, "Aluguel não encontrado");

    // Buscar as notas associadas ao aluguel
    const notas = await notaRepository.find({
      where: { aluguel: { id: aluguel.id } },
    });

    return RouteResponse.success(res, notas);
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
    const aluguel: Aluguel = aluguelRepository.create(req.body as Aluguel);
    await aluguelRepository.save(aluguel);
    const id = aluguel["id"];

    for (const produtoData of req.body.produtos) {
      const aluguelProduto = aluguelProdutoRepository.create({
        ...produtoData,
        aluguel: id,
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
   *           type: string
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
    const id = req.params.id;
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
   *           type: string
   *         required: true
   *         description: ID do aluguel
   */

  @Delete("/:id")
  async delete(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    await aluguelRepository.delete(id);
    return RouteResponse.successEmpty(res);
  }
}
