import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swagger";
import express from "express";
import { registerControllers } from "./config/routes";
import logger from "./config/logger";
import cors from "cors";
import morganMiddleware from "./config/morgan";
import ignoreFavicon from "./config/favicon";
import listRoutes from "./config/routesLogger";
import { AppDataSource } from "./config/data-source";

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: "*", // Permitindo todas as origens. Você pode especificar origens específicas aqui, se necessário
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
};

app.use(cors(corsOptions)); // Usando o CORS

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para ignorar o favicon
app.use(ignoreFavicon);

// Middleware do Morgan com configuração de cores
app.use(morganMiddleware);

// Dinamicamente registra todos os controllers nas rotas

const port = process.env.PORT || 3000;
// Chama a função para listar as rotas
AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado!");
    registerControllers(app, __dirname + "/controllers");

    app.listen(3000, () => {
      logger.info(`Servidor rodando em http://localhost:${port}`);
      logger.info(
        `Documentação disponível em http://localhost:${port}/api-docs`
      );
      listRoutes(app);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados", error);
    process.exit(1);
  });
