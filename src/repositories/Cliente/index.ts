import { AppDataSource } from "../../config/data-source";
import { Cliente } from "../../entities/Cliente";

const repo = AppDataSource.getRepository(Cliente);

export const clienteRepository = repo;
