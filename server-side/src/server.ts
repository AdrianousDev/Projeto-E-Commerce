import express from "express";
import "dotenv/config";
import cors from "cors";
import { mainRouter } from "./routes/main";
import helmet from "helmet";
import { fetchFakeStoreApi } from "./services/fakeStoreApi";

const server = express();
server.use(helmet());
server.use(cors());
server.disable("x-powered-by");
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use((req, res, next) => {
  console.log(req.method + " " + req.url);
  next();
});

server.use(mainRouter);

(async () => {
  try {
    await fetchFakeStoreApi();
    console.log("Produtos sincronizados com sucesso!");
  } catch (err) {
    console.error("Erro ao sincronizar produtos:", err);
  }
})();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
