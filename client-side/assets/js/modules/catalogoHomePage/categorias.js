import exibirProdutos from "./exibirProdutos.js";
import quantidadeProdutos from "./quantidadeProdutos.js";
import initModal from "../modal/initModal.js";

export default function initCategorias(produtos, categorias) {
  const cardCategorias = document.querySelector("#categorias");

  categorias.forEach((categoria) => {
    const btn = document.createElement("button");
    btn.className =
      "w-full text-left bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded transition capitalize";
    btn.classList.add("btn", "card", "btn-outline-primary");
    btn.dataset.categoria = categoria;
    btn.innerText = categoria;

    cardCategorias.appendChild(btn);
  });

  const buttonsCategoria = document.querySelectorAll("[data-categoria]");
  buttonsCategoria.forEach((button) => {
    button.addEventListener("click", (event) => {
      buttonsCategoria.forEach((item) => {
        item.classList.remove("active");
        item.classList.add("bg-blue-100");
      });
      event.target.classList.remove("bg-blue-100");
      event.target.classList.add("active");
      const categoriaEscolhida = event.target.dataset.categoria;

      if (categoriaEscolhida == "todas") {
        exibirProdutos(produtos);
        quantidadeProdutos(produtos.length);
        initModal(produtos);
        return;
      }

      const produtosFiltrados = produtos.filter(
        (item) => item.categoria == categoriaEscolhida
      );
      exibirProdutos(produtosFiltrados);
      quantidadeProdutos(produtosFiltrados.length);
      initModal(produtos);
    });
  });
}
