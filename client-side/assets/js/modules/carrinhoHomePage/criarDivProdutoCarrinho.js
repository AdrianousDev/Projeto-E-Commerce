import adicionarItemCarrinhoLocalStorage from "./adicionarItemCarrinhoLocalStorage.js";
import diminuirItemCarrinhoLocalStorage from "./diminuirItemCarrinhoLocalStorage.js";
import removerItemCarrinhoLocalStorage from "./removerItemCarrinhoLocalStorage.js";

export default function criarDivProdutoCarrinho(produto) {
  const divCarrinho = document.querySelector("#carrinho");
  const card = document.createElement("div");
  card.className =
    "flex items-center justify-between bg-white rounded-lg shadow-sm p-3 mb-2 border border-gray-100 hover:shadow-md transition";

  card.innerHTML = `
        <div class="flex items-center gap-3">
          <img 
            src="${produto.imagemUrl || "/client-side/src/imgs/default.png"}"
            alt="${produto.titulo}" 
            class="w-12 h-12 object-contain rounded"
            onerror="this.onerror=null; this.src='/client-side/src/imgs/default.png';"
          />
          <div>
            <h4 class="text-sm font-semibold text-gray-800" title="${
              produto.titulo
            }">
              ${
                produto.titulo.length > 30
                  ? produto.titulo.slice(0, 30) + "..."
                  : produto.titulo
              }
            </h4>
            <p class="text-xs text-gray-500">${produto.category}</p>
          </div>
        </div>
        <div class="flex flex-col items-center gap-1">
          <span class="text-green-600 font-semibold text-sm">R$ ${(
            Number(produto.preco).toFixed(2) * produto.quantidade
          ).toFixed(2)}</span>
          <div class="flex items-center gap-2">
            <button class="btn-menos bg-gray-200 hover:bg-gray-300 rounded w-6 h-6 text-sm font-bold flex items-center justify-center">−</button>
            <span class="quantidade text-sm font-medium w-5 text-center">${
              produto.quantidade
            }</span>
            <button data-id="${
              produto.id
            }" class="btn-mais bg-blue-500 hover:bg-blue-600 text-white rounded w-6 h-6 text-sm font-bold flex items-center justify-center">+</button>
          </div>
          <button data-id="${
            produto.id
          }" class="btn-remover text-red-500 hover:text-red-600 text-xs mt-1 font-medium">Remover</button>
        </div>
      `;
  divCarrinho.appendChild(card);

  // referencia elementos do card
  const btnMais = card.querySelector(".btn-mais");
  const btnMenos = card.querySelector(".btn-menos");
  const btnRemover = card.querySelector(".btn-remover");

  // eventos
  btnMais.addEventListener("click", () => {
    adicionarItemCarrinhoLocalStorage(produto);
  });

  btnMenos.addEventListener("click", () => {
    if (produto.quantidade > 1) {
      diminuirItemCarrinhoLocalStorage(produto);
    } else if (produto.quantidade <= 1) {
      card.classList.add("opacity-0", "scale-95", "transition", "duration-150");
      setTimeout(() => card.remove(), 150); // animação de remoção suave
      removerItemCarrinhoLocalStorage(produto);
    }
  });

  btnRemover.addEventListener("click", () => {
    card.classList.add("opacity-0", "scale-95", "transition", "duration-150");
    setTimeout(() => card.remove(), 150); // animação de remoção suave
    removerItemCarrinhoLocalStorage(produto);
  });
}
