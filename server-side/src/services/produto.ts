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
  const todosProdutos = await prisma.produto.findMany({});
  return todosProdutos;
};

export const findProduto = async (id: number) => {
  const produto = await prisma.produto.findUnique({
    where: { id },
  });
  return produto;
};

export const deleteProduto = async (id: number) => {
  try {
    const deletedProduto = await prisma.produto.delete({ where: { id } });
    return deletedProduto;
  } catch (error) {
    return { error: error.meta };
  }
};
