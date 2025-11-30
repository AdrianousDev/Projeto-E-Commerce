export default function exibirProdutos(produtos) {
  const catalogoProdutos = document.querySelector("#products");
  catalogoProdutos.innerHTML = "";

  produtos.forEach((produto) => {
    const card = document.createElement("div");

    card.innerHTML = `
      <div class="bg-white rounded-lg shadow-md overflow-hidden p-4 flex flex-col justify-between h-full cursor-pointer" data-produto data-id="${
        produto.id
      }">
        <h5 class="text-lg font-semibold text-center text-blue-800 mb-4 line-clamp-1" title="${
          produto.titulo
        }">
          ${produto.titulo}
        </h5>

        <div class="flex justify-center mb-4">
          <img
            src="${produto.imagemUrl || "/client-side/src/imgs/default.png"}"
            alt="${produto.titulo}"
            class="h-40 object-contain"
            onerror="this.onerror=null; this.src='/client-side/src/imgs/default.png';"
          />

        </div>

        <div class="mb-4">
          <span class="block text-xl font-bold text-green-600 mb-1">
            R$ ${Number(produto.preco).toFixed(2)}
          </span>
          <div class="flex justify-between text-sm text-gray-600">
            <span class="capitalize text-gray-500">${produto.categoria}</span>
            <span>
              ⭐ ${produto.avaliacao}
              <span class="text-xs text-gray-400">(${produto.estoque})</span>
            </span>
          </div>
        </div>

        <p class="text-sm text-gray-700 line-clamp-3" title="${
          produto.descricao
        }">
          ${produto.descricao}...
        </p>
      </div>
    `;

    catalogoProdutos.appendChild(card);
  });
}
