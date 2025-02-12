import { AppDataSource } from "../../config/data-source";
import { AluguelProduto } from "../../entities/Aluguel";

const repo = AppDataSource.getRepository(AluguelProduto);

export const aluguelProdutoRepository = repo;
