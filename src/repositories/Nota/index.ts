import { AppDataSource } from "../../config/data-source";

import { Nota } from "../../entities/Nota";

const repo = AppDataSource.getRepository(Nota);

export const notaRepository = repo;
