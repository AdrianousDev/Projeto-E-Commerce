import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const createProduto = async (data: Prisma.ProdutoCreateInput) => {
  try {
    const createdProduto = await prisma.produto.create({ data });

    /*
INSERT INTO Produto (
  titulo,
  descricao,
  preco,
  categoria,
  estoque,
)
VALUES ();
*/

    return createdProduto;
  } catch (error) {
    return false;
  }
};

export const listProdutos = async () => {
  const todosProdutos = await prisma.produto.findMany({});
  /*
SELECT *
FROM Produto;
*/
  return todosProdutos;
};

export const findProduto = async (id: number) => {
  const produto = await prisma.produto.findUnique({
    where: { id },
  });

  /*
SELECT *
FROM Produto
WHERE id = ID_AQUI;
*/

  return produto;
};

export const deleteProduto = async (id: number) => {
  try {
    const deletedProduto = await prisma.produto.delete({ where: { id } });
    /*
DELETE FROM Produto
WHERE id = ID_AQUI;
*/
    return deletedProduto;
  } catch (error) {
    return { error: error.meta };
  }
};
