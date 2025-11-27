import { Router } from "express";
import dotenv from "dotenv";
import { createCliente } from "../services/cliente";
import { createProduto, listProdutos, findProduto } from "../services/produto";
import { createPedido, findMeuPedidos } from "../services/pedido";
import { validarCarrinho } from "../services/validarCarrinho";
import { validarEstoque } from "../middlewares/validarEstoque";
import { listCategorias } from "../services/categoria";

export const mainRouter = Router();

mainRouter.get("/ping", (req, res) => {
  res.json({ pong: true });
});

mainRouter.post("/clientes", async (req, res) => {
  const { nome, email } = req.body;

  const data = {
    nome,
    email,
  };

  const result = await createCliente(data);
  res.json(result);
});

mainRouter.post("/produtos", async (req, res) => {
  const { titulo, descricao, preco, categoria, imagemUrl, estoque } = req.body;

  const data = {
    titulo,
    descricao,
    preco,
    categoria,
    imagemUrl,
    estoque,
  };

  const result = await createProduto(data);
  res.json(result);
});

mainRouter.get("/produtos", async (req, res) => {
  const result = await listProdutos();
  res.json(result);
});

mainRouter.get("/produto/:id", async (req, res) => {
  const id = Number(req.params.id);

  const result = await findProduto(id);
  res.json(result);
});

mainRouter.post("/pedidos", validarEstoque, async (req, res) => {
  const { clienteId, produtos } = req.body;

  const result = await createPedido(clienteId, produtos);
  res.json(result);
});

mainRouter.post("/carrinho/validar", async (req, res) => {
  const { produtoId, quantidade } = req.body;
  console.log(produtoId, quantidade);

  const result = await validarCarrinho(produtoId, quantidade);
  res.json(result);
});

mainRouter.get("/minhas-compras", async (req, res) => {
  const email = req.body.email;

  const result = await findMeuPedidos(email);
  res.json(result);
});

mainRouter.get("/categorias", async (req, res) => {
  const result = await listCategorias();
  res.json(result);
});

mainRouter.get("/env", (req, res) => {
  const env = {
    GET_PRODUTOS: process.env.GET_PRODUTOS,
    GET_CATEGORIAS: process.env.GET_CATEGORIAS,
  };

  res.json(env);
});
