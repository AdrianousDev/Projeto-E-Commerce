import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const createProduto = async (data: Prisma.ProdutoCreateInput) => {
  try {
    const createdProduto = await prisma.produto.create({ data });
    return createdProduto;
  } catch (error) {
    return false;
  }
};

export const listProdutos = async () => {
  const todosProdutos = prisma.produto.findMany({});
  return todosProdutos;
};

export const findProduto = async (id: number) => {
  const produto = await prisma.produto.findUnique({
    where: { id },
  });
  return produto;
};
