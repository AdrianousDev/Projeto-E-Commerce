import exibirProdutos from "./exibirProdutos.js";
import quantidadeProdutos from "./quantidadeProdutos.js";
import initModal from "../modal/initModal.js";

export default function barraDeBusca(produtos) {
  const formSearch = document.querySelector("#form-search");

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();

    const buttonsCategoria = document.querySelectorAll("[data-categoria]");
    buttonsCategoria.forEach((btn) => {
      btn.classList.remove("active");
      btn.classList.add("bg-blue-100");
    });

    const pesquisa = formSearch.pesquisaValue.value;

    const produtosFiltrados = produtos.filter((item) =>
      item.titulo.toLowerCase().trim().includes(pesquisa.toLowerCase().trim())
    );

    exibirProdutos(produtosFiltrados);
    initModal(produtosFiltrados);
    quantidadeProdutos(produtosFiltrados.length);
  });
}
