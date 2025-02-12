import { AppDataSource } from "../../config/data-source";
import { Aluguel } from "../../entities/Aluguel";

const repo = AppDataSource.getRepository(Aluguel);

export const aluguelRepository = repo;
