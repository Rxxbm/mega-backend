import { AppDataSource } from "../../config/data-source";
import { Classificacao } from "../../entities/Classificacao";

const repo = AppDataSource.getRepository(Classificacao);

export const classificacaoRepository = repo;
