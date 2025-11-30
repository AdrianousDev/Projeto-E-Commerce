import chamarApi from "../chamarApi.js";
import criarDivProdutoCarrinho from "./criarDivProdutoCarrinho.js";

export default async function exibirItemCarrinho() {
  const env = await chamarApi("http://localhost:3000/env");

  const urlProdutos = env.GET_PRODUTOS;
  const produtos = await chamarApi(urlProdutos);

  const produtosLocalStorage =
    JSON.parse(localStorage.getItem("carrinho")) || [];

  const buscarProdutos = [];
  produtosLocalStorage.forEach((produto) => {
    const item = produtos.find((p) => p.id === produto.id);
    if (item) {
      buscarProdutos.push({
        ...item,
        quantidade: produto.quantidade, // mantém a quantidade salva no carrinho
      });
    }
  });

  const divCarrinho = document.querySelector("#carrinho");
  divCarrinho.innerHTML = "";

  buscarProdutos.forEach((produto) => {
    criarDivProdutoCarrinho(produto);
  });
}
