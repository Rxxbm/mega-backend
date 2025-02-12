import { AppDataSource } from "../../config/data-source";
import { ProdutoNota } from "../../entities/ProdutoNota";

const repo = AppDataSource.getRepository(ProdutoNota);

export const notaProdutoRepository = repo;
