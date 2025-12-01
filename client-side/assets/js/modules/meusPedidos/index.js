import fetchPedidos from "./fetchPedidos.js";

const form = document.querySelector("#formBuscarPedidos");
const resultadoDiv = document.querySelector("#resultadoPedidos");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#emailPedidos").value.trim();
  resultadoDiv.innerHTML =
    '<p class="text-center text-blue-600 font-medium">Buscando pedidos...</p>';

  await fetchPedidos(email);
});
