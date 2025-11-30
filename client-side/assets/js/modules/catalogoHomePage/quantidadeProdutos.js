export default function quantidadeProdutos(quantidade) {
  const marcadorDeQuantidade = document.querySelector("#marcadorCategoria");
  if (marcadorDeQuantidade) {
    marcadorDeQuantidade.textContent = `${quantidade} produtos`;
  }
}
