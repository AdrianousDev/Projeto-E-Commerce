import { prisma } from "../libs/prisma";

export const listCategorias = async () => {
  try {
    const categorias = await prisma.produto.findMany({
      select: { categoria: true },
      distinct: ["categoria"], // não repetir
    });

    const listaDeCategorias = categorias.map((c) => c.categoria); // apenas os nomes

    return listaDeCategorias;
  } catch (err) {
    console.log(err);
    return false;
  }
};
