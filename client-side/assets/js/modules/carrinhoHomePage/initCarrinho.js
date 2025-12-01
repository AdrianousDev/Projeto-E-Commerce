import exibirItemCarrinho from "./exibirItemCarrinho.js";
import quantidadeProdutosCarrinho from "./quantidadeProdutosCarrinho.js";
import realizarPedidoEvent from "./realizarPedidoEvent.js";

export default async function initCarrinho() {
  // cria se não tiver
  if (!localStorage.getItem("carrinho")) {
    localStorage.setItem("carrinho", JSON.stringify([]));
  }

  await exibirItemCarrinho();
  quantidadeProdutosCarrinho();
  realizarPedidoEvent();
}
