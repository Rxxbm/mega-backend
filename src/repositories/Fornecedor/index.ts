import { AppDataSource } from "../../config/data-source";
import { Fornecedor } from "../../entities/Fornecedor";

const repo = AppDataSource.getRepository(Fornecedor);

export const FornecedorRepository = repo;
