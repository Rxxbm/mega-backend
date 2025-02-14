import request from "supertest";
import app from "../../../src/app"; // Importa o Express.js
import { AppDataSource } from "../../../src/config/data-source"; // Importa o DataSource

beforeAll(async () => {
  console.log("Inicializando o banco de testes...");
  await AppDataSource.initialize();
  console.log("Banco de dados para testes conectado!");
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy(); // Fecha a conexão
    console.log("Conexão com o banco de testes encerrada.");
  }
});

describe("Testando API", () => {
  it("Deve retornar 200 na rota GET /api-docs", async () => {
    const response = await request(app).get("/api-docs");
    expect(response.status).toBe(200);
  });
});
