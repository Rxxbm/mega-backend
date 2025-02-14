import { AppDataSource } from "../../config/data-source";
import { AluguelProduto } from "../../entities/AluguelProduto";

const repo = AppDataSource.getRepository(AluguelProduto);

export const aluguelProdutoRepository = repo;
