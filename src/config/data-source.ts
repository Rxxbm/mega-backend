import { DataSource } from "typeorm";
import { Fornecedor } from "../entities/Fornecedor";
import { Aluguel, AluguelProduto } from "../entities/Aluguel";
import { Produto } from "../entities/Produto";
import { Nota } from "../entities/Nota";
import { ProdutoNota } from "../entities/ProdutoNota";
import { Cliente } from "../entities/Cliente";
import { Obras } from "../entities/Obras";
import { Classificacao } from "../entities/Classificacao";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: 5432,
  username: process.env.POSTGRES_USER || "seu_usuario",
  password: process.env.POSTGRES_PASSWORD || "sua_senha",
  database: process.env.POSTGRES_DB || "sua_base",
  synchronize: true, // Use apenas em desenvolvimento
  logging: false,
  entities: [
    Fornecedor,
    Aluguel,
    Produto,
    Nota,
    ProdutoNota,
    Cliente,
    Obras,
    AluguelProduto,
    Classificacao,
  ], // Ajuste conforme sua estrutura
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});
