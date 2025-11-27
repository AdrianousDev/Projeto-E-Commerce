import { prisma } from "../libs/prisma";

export const createPedido = async (clienteId, produtos) => {
  try {
    // Buscar os produtos no banco
    const produtosDoBanco = await prisma.produto.findMany({
      where: { id: { in: produtos.map((p) => p.id) } },
    });

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

    return pedidoCriado;
  } catch (error) {
    return false;
  }
};

export const findMeuPedidos = async (email) => {
  try {
    const clienteInfo = await prisma.cliente.findUnique({ where: { email } });

    const id = clienteInfo.id;
    const meusPedidos = await prisma.pedido.findMany({
      where: { clienteId: id },
      include: { itens: { include: { produto: true } } },
    });

    return { pedidos: meusPedidos };
  } catch (error) {
    return false;
  }
};
