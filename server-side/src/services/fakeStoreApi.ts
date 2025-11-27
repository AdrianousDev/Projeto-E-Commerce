import { prisma } from "../libs/prisma";
import fetchApi from "./fetchApi";

export const fetchFakeStoreApi = async () => {
  try {
    const products = await fetchApi("https://fakestoreapi.com/products");

    // Se der erro na API externa
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
            estoque: product.rating.count,
            avaliacao: product.rating.rate,
          },
          update: {
            descricao: product.description,
            preco: product.price,
            categoria: product.category,
            imagemUrl: product.image,
            updatedAt: new Date(),
            avaliacao: product.rating.rate,
            estoque: product.rating.count,
          },
        })
      )
    );

    return upsertedProducts;
  } catch (error) {
    console.error("Erro no upsert:", error);
    return false;
  }
};
