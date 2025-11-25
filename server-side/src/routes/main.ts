import { Router } from "express";
import { createCliente } from "../services/clientes";

export const mainRouter = Router();

mainRouter.get("/ping", (req, res) => {
  res.json({ pong: true });
});

mainRouter.post("/clientes", async (req, res) => {
  const data = {
    name: "Bruno",
    email: "bruno@teste.com",
  };
  const result = await createCliente(data);
  res.json(result);
});
