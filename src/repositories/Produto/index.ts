import { AppDataSource } from "../../config/data-source";
import { Produto } from "../../entities/Produto";

const repo = AppDataSource.getRepository(Produto);

export const produtoRepository = repo;
