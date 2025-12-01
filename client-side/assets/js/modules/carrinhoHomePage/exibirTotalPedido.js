export default function exibirTotalPedido() {
  const totalSpan = document.querySelector("#totalCarrinho");
  const pedidoBtn = document.querySelector("#realizarPedidoBtn");

  const produtosCarrinho = document.querySelectorAll(
    "[data-precoprodutototal]"
  );

  let total = 0;
  produtosCarrinho.forEach((produto) => {
    const produtoPreco = Number(produto.dataset.precoprodutototal);
    total += produtoPreco;
  });

  if (total <= 0) {
    pedidoBtn.disabled = true;
    pedidoBtn.className =
      "w-full bg-blue-900 py-2 text-white font-bold rounded-md";
  } else {
    pedidoBtn.removeAttribute("disabled");
    pedidoBtn.className =
      "w-full bg-blue-600 py-2 text-white font-bold rounded-md hover:bg-blue-700 cursor-pointer";
  }

  totalSpan.innerHTML = `R$ ${total.toFixed(2)}`;
}
