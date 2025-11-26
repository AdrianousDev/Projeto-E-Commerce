import { prisma } from "../libs/prisma";

export const validarCarrinho = async (
  produtoId: number,
  quantidade: number
) => {
  try {
    const produto = await prisma.produto.findUnique({
      where: { id: produtoId },
    });

    if (!produto) {
      return { error: "Produto não encontrado." };
    }

    if (produto.estoque < quantidade) {
      return { error: `Estoque insuficiente. Disponível: ${produto.estoque}` };
    }

    return { disponivel: true, disponives: produto.estoque };
  } catch (error) {
    console.log(error);
    return { error: "Erro no servidor." };
  }
};
