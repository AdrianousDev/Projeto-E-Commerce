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

    /*
INSERT INTO Produto (
  titulo,
  descricao,
  preco,
  categoria,
  imagemUrl,
  estoque,
  avaliacao,
  createdAt
)
VALUES (
  'product.title',
  'product.description',
  product.price,
  'product.category',
  'product.image',
  product.rating.count,
  product.rating.rate,
  NOW()
)
ON DUPLICATE KEY UPDATE
  descricao = VALUES(descricao),
  preco = VALUES(preco),
  categoria = VALUES(categoria),
  imagemUrl = VALUES(imagemUrl),
  estoque = VALUES(estoque),
  avaliacao = VALUES(avaliacao),
  updatedAt = NOW();

*/

    return upsertedProducts;
  } catch (error) {
    console.error("Erro no upsert:", error);
    return false;
  }
};
