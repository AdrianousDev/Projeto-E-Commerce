import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const createPedido = async (clienteId, produtos) => {
  try {
    // Buscar os produtos no banco
    const produtosDoBanco = await prisma.produto.findMany({
      where: { id: { in: produtos.map((p) => p.id) } },
    });

    /*
    SELECT *
    FROM Produto
    WHERE id IN (id, id, id);
*/

    let total = 0;

    const itens = produtos.map((item) => {
      const produto = produtosDoBanco.find((p) => p.id === item.id);

      total += Number(produto.preco) * item.quantidade;

      return {
        produtoId: item.id,
        quantidade: item.quantidade,
      };
    });

    const pedidoCriado = await prisma.pedido.create({
      data: {
        clienteId,
        total,
        itens: { create: itens },
      },
      include: { itens: true },
    });

    /*
INSERT INTO Pedido (clienteId, total)
VALUES (CLIENTE_ID, TOTAL_CALCULADO);
*/

    /*
INSERT INTO ItemPedido (pedidoId, produtoId, quantidade)
VALUES (NOVO_PEDIDO_ID, 1, 2);

INSERT INTO ItemPedido (pedidoId, produtoId, quantidade)
VALUES (NOVO_PEDIDO_ID, 4, 1);

INSERT INTO ItemPedido (pedidoId, produtoId, quantidade)
VALUES (NOVO_PEDIDO_ID, 7, 3);
*/

    for (const item of produtos) {
      await prisma.produto.update({
        where: { id: item.id },
        data: {
          estoque: {
            decrement: item.quantidade,
          },
        },
      });
    }

    /*
UPDATE Produto
SET estoque = estoque - ITEM_QUANTIDADE
WHERE id = ITEM_ID;
*/

    return pedidoCriado;
  } catch (error) {
    return false;
  }
};

export const findMeuPedidos = async (email) => {
  try {
    const clienteInfo = await prisma.cliente.findUnique({ where: { email } });
    /*
SELECT *
FROM Cliente
WHERE email = 'EMAIL_AQUI';
*/

    const id = clienteInfo.id;
    const meusPedidos = await prisma.pedido.findMany({
      where: { clienteId: id },
      include: { itens: { include: { produto: true } } },
    });

    /*
SELECT
  p.id AS pedidoId,
  p.clienteId,
  p.total,
  p.createdAt,

  ip.id AS itemId,
  ip.produtoId,
  ip.quantidade,

  prod.titulo,
  prod.descricao,
  prod.preco,
  prod.categoria,
  prod.imagemUrl
FROM Pedido p
LEFT JOIN ItemPedido ip ON ip.pedidoId = p.id
LEFT JOIN Produto prod ON prod.id = ip.produtoId
WHERE p.clienteId = CLIENTE_ID;
*/

    return { pedidos: meusPedidos };
  } catch (error) {
    return false;
  }
};

export const deletePedido = async (id: number) => {
  try {
    await prisma.itemPedido.deleteMany({
      where: { pedidoId: id },
    });

    const deletedPedido = await prisma.pedido.delete({
      where: { id },
    });

    /*
DELETE FROM ItemPedido
WHERE pedidoId = PEDIDO_ID;
*/

    return deletedPedido;
  } catch (error: any) {
    console.error("Erro ao deletar pedido:", error);
    return { error: error.meta || error.message };
  }
};
