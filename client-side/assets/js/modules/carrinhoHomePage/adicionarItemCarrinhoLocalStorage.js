import exibirItemCarrinho from "./exibirItemCarrinho.js";
import quantidadeProdutosCarrinho from "./quantidadeProdutosCarrinho.js";

async function validarProdutoNoCarrinho(produtoId, quantidade) {
  try {
    const response = await fetch("http://localhost:3000/carrinho/validar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produtoId, quantidade }),
    });

    return await response.json();
  } catch (error) {
    return { error: "Erro ao conectar ao servidor." };
  }
}

export default async function adicionarItemCarrinhoLocalStorage(
  produtoEscolhido
) {
  const idProduto = produtoEscolhido.id;

  // Obtém o carrinho existente ou cria um novo
  const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Procura o produto no carrinho
  const produtoExistente = carrinhoAtual.find((item) => item.id === idProduto);

  // Quantidade que ficará após adicionar +1
  const novaQuantidade = produtoExistente ? produtoExistente.quantidade + 1 : 1;

  // 🔥 VALIDAÇÃO NO BACK-END
  const validacao = await validarProdutoNoCarrinho(idProduto, novaQuantidade);

  if (validacao.error) {
    alert(`❌ ${validacao.error}`);
    return; // impede de adicionar
  }

  // Se passou na validação, pode adicionar ao carrinho
  if (produtoExistente) {
    produtoExistente.quantidade += 1;
  } else {
    carrinhoAtual.push({ id: idProduto, quantidade: 1 });
  }

  // Salva o carrinho atualizado
  localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));

  console.log("Carrinho atualizado:", carrinhoAtual);

  exibirItemCarrinho();
  quantidadeProdutosCarrinho();
}
