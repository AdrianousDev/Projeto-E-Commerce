import buttonDeleteEvent from "./buttonDeleteEvent.js";
import exibirPedidos from "./exibirPedidos.js";

export default async function fetchPedidos(email) {
  try {
    const response = await fetch(
      `http://localhost:3000/minhas-compras/${email}`
    );

    if (!response.ok) {
      resultadoDiv.innerHTML =
        '<p class="text-center text-red-600 font-medium">Erro ao buscar pedidos.</p>';
      return;
    }

    const dados = await response.json();

    if (!dados.pedidos || dados.pedidos.length === 0) {
      resultadoDiv.innerHTML =
        '<p class="text-center text-gray-600">Nenhum pedido encontrado.</p>';
      return;
    }

    exibirPedidos(dados);

    buttonDeleteEvent();
  } catch (erro) {
    resultadoDiv.innerHTML =
      '<p class="text-center text-red-600 font-medium">Erro ao conectar ao servidor.</p>';
  }
}
