import exibirItemCarrinho from "./exibirItemCarrinho.js";
import quantidadeProdutosCarrinho from "./quantidadeProdutosCarrinho.js";

export default function realizarPedidoEvent() {
  const pedidoBtn = document.querySelector("#realizarPedidoBtn");

  pedidoBtn.addEventListener("click", async () => {
    try {
      if (!localStorage.getItem("cliente")) {
        alert("Faça login para realizar um pedido!");
        return;
      }

      if (!JSON.parse(localStorage.getItem("carrinho")).length > 0) {
        alert("Adicione produto ao carrinho para realizar um pedido!");
        return;
      }

      const cliente = JSON.parse(localStorage.getItem("cliente"));
      const carrinho = JSON.parse(localStorage.getItem("carrinho"));

      const data = {
        clienteId: cliente.id,
        produtos: carrinho,
      };

      const response = await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Pedido realizado com sucesso!");
      }

      localStorage.setItem("carrinho", JSON.stringify([]));

      exibirItemCarrinho();
      quantidadeProdutosCarrinho();
    } catch (error) {
      console.log(`Erro ao realizar produto: ${error}`);
    }
  });
}
