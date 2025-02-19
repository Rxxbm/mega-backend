import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swagger";
import express from "express";
import { registerControllers } from "./config/routes";
import cors from "cors";
import morganMiddleware from "./config/morgan";
import ignoreFavicon from "./config/favicon";
import listRoutes from "./config/routesLogger";
import { AppDataSource } from "./config/data-source";

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(ignoreFavicon);
if (process.env.NODE_ENV !== "test") app.use(morganMiddleware);

// Função para iniciar o banco de dados e carregar as rotas
export const initializeApp = async () => {
  await AppDataSource.initialize();
  console.log("Banco de dados conectado!");

  registerControllers(app, __dirname + "/controllers");
  if (process.env.NODE_ENV !== "test") listRoutes(app);
};

export default app; // Exporta o app para ser usado nos testes
