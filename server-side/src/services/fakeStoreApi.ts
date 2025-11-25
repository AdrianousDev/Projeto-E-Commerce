import { prisma } from "../libs/prisma";
import fetchApi from "./fetchApi";

export const fetchFakeStoreApi = async () => {
  try {
    const products = await fetchApi("https://fakestoreapi.com/products");

    if (!products) return false;

    const upsertedProducts = await Promise.all(
      products.map((product) =>
        prisma.produto.upsert({
          where: { titulo: product.title },
          create: {
            titulo: product.title,
            descricao: product.description,
            preco: product.price,
            categoria: product.category,
            imagemUrl: product.image,
            estoque: 10,
          },
          update: {},
        })
      )
    );

    return upsertedProducts;
  } catch (error) {
    console.error("Erro no upsert:", error);
    return false;
  }
};
