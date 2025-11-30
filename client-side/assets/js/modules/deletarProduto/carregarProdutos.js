import chamarApi from "../chamarApi.js";

export default async function carregarProdutos() {
  const select = document.getElementById("selectProdutos");
  try {
    const produtos = await chamarApi("http://localhost:3000/produtos");

    select.innerHTML = "<option value='' disabled selected>Selecione</option>";

    produtos.forEach((p) => {
      const option = document.createElement("option");
      option.value = p.id;
      option.textContent = `#${p.id} - ${p.titulo}`;
      select.appendChild(option);
    });
  } catch (err) {
    select.innerHTML = "<option disabled>Erro ao carregar produtos</option>";
    console.log(err);
  }
}
