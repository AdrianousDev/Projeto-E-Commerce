import exibirItemCarrinho from "./exibirItemCarrinho.js";
import quantidadeProdutosCarrinho from "./quantidadeProdutosCarrinho.js";

export default function removerItemCarrinhoLocalStorage(produtoEscolhido) {
  const idProduto = produtoEscolhido.id;

  // Obtém o carrinho existente ou cria um novo
  const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Procura o produto no carrinho
  const indexProduto = carrinhoAtual.findIndex((item) => item.id === idProduto);

  // Remove o item se a quantidade for 0
  if (carrinhoAtual[indexProduto]) {
    carrinhoAtual.splice(indexProduto, 1);
  }

  // Salva o carrinho atualizado
  localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));

  console.log("Carrinho atualizado:", carrinhoAtual);

  exibirItemCarrinho();
  quantidadeProdutosCarrinho();
}
