export default function quantidadeProdutosCarrinho() {
  const produtosLocalStorage =
    JSON.parse(localStorage.getItem("carrinho")) || [];

  const marcador = document.querySelector("#marcadorCarrinho");
  let contador = 0;
  produtosLocalStorage.forEach((produto) => {
    contador += produto.quantidade;
  });

  marcador.textContent = `${contador} produtos`;
}
