import { prisma } from "../libs/prisma";

export const validarEstoque = async (req, res, next) => {
  try {
    const { produtos } = req.body;

    if (!Array.isArray(produtos) || produtos.length === 0) {
      return res.status(400).json({
        error: "Lista de produtos inválida.",
      });
    }

    const produtosDoBanco = await prisma.produto.findMany({
      where: { id: { in: produtos.map((p) => p.id) } },
    });

    /*
    SELECT *
    FROM Produto
    WHERE id IN (id, id, id);
    */

    for (const item of produtos) {
      const produto = produtosDoBanco.find((p) => p.id === item.id);

      if (!produto) {
        return res.status(404).json({
          error: `Produto com id ${item.id} não encontrado.`,
        });
      }

      if (produto.estoque < item.quantidade) {
        return res.status(400).json({
          error: `Estoque insuficiente para o produto: ${produto.titulo}. Disponível: ${produto.estoque}`,
        });
      }
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Erro ao validar estoque." });
  }
};
