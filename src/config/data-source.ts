import { DataSource } from "typeorm";
import { Fornecedor } from "../entities/Fornecedor";
import { Aluguel } from "../entities/Aluguel";
import { AluguelProduto } from "../entities/AluguelProduto";
import { Produto } from "../entities/Produto";
import { Nota } from "../entities/Nota";
import { ProdutoNota } from "../entities/ProdutoNota";
import { Cliente } from "../entities/Cliente";
import { Obras } from "../entities/Obras";
import { Classificacao } from "../entities/Classificacao";

const isTest = process.env.NODE_ENV === "test";

export const AppDataSource = new DataSource(
  isTest
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true, // Apenas para testes
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
        ],
        migrations: [],
        subscribers: [],
      }
    : {
        type: "postgres",
        database: process.env.POSTGRES_DB,
        host: process.env.DB_HOST || "db",
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        synchronize: true, // Apenas para testes
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
        ],
        migrations: ["src/migration/**/*.ts"],
        subscribers: ["src/subscriber/**/*.ts"],
        extra: {
          ssl: process.env.NODE_ENV === "production",
        },
      }
);
