import exibirItemCarrinho from "./exibirItemCarrinho.js";
import quantidadeProdutosCarrinho from "./quantidadeProdutosCarrinho.js";

export default function diminuirItemCarrinhoLocalStorage(produtoEscolhido) {
  const idProduto = produtoEscolhido.id;

  // Obtém o carrinho existente ou cria um novo
  const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Procura o produto no carrinho
  const produtoExistente = carrinhoAtual.find((item) => item.id === idProduto);

  if (produtoExistente) {
    // Se já existe, apenas incrementa a quantidade
    produtoExistente.quantidade -= 1;
  }

  // Salva o carrinho atualizado
  localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));

  console.log("Carrinho atualizado:", carrinhoAtual);

  exibirItemCarrinho();
  quantidadeProdutosCarrinho();
}
