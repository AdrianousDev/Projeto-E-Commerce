import exibirItemCarrinho from "./exibirItemCarrinho.js";
import quantidadeProdutosCarrinho from "./quantidadeProdutosCarrinho.js";

export default function initCarrinho(produtos) {
  // cria se não tiver
  if (!localStorage.getItem("carrinho")) {
    localStorage.setItem("carrinho", JSON.stringify([]));
  }

  exibirItemCarrinho();
  quantidadeProdutosCarrinho();
}
