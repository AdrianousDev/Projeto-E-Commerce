export default function exibirPedidos(dados) {
  const resultadoDiv = document.querySelector("#resultadoPedidos");

  resultadoDiv.innerHTML = dados.pedidos
    .map((pedido) => {
      const itensHtml = pedido.itens
        .map(
          (item) => `
                <div class="border border-gray-200 bg-gray-50 p-4 rounded-md shadow-sm flex gap-4">
                  <img src="${item.produto.imagemUrl}" alt="${item.produto.titulo}" class="w-20 h-20 object-cover rounded"/>

                  <div class="flex-1">
                    <h4 class="font-semibold text-lg text-blue-800">${item.produto.titulo}</h4>
                    <p class="text-sm text-gray-600">${item.produto.categoria}</p>
                    <p class="text-sm mt-1">Quantidade: <span class="font-semibold">${item.quantidade}</span></p>
                    <p class="text-sm">Preço: <span class="font-semibold">R$ ${item.produto.preco}</span></p>
                  </div>
                </div>
              `
        )
        .join("");

      return `
            <div class="border border-blue-300 bg-blue-50 p-6 rounded-lg shadow space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="text-xl font-bold text-blue-900">Pedido #${
                  pedido.id
                }</h3>
                <span class="text-sm text-gray-700">${new Date(
                  pedido.createdAt
                ).toLocaleDateString("pt-BR")}</span>
                <button class='px-4 py-2 rounded-full text-white bg-red-500 cursor-pointer' data-buttonDelete='${
                  pedido.id
                }'>X</button>
              </div>

              <p class="text-lg font-medium">Total: 
                <span class="text-blue-800 font-bold">R$ ${pedido.total}</span>
              </p>

              <div class="space-y-3">
                ${itensHtml}
              </div>
            </div>
          `;
    })
    .join("");
}
