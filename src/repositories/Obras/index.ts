import { AppDataSource } from "../../config/data-source";
import { Obras } from "../../entities/Obras";

const repo = AppDataSource.getRepository(Obras);

export const obrasRepository = repo;
