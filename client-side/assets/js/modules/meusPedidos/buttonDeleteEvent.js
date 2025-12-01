export default function buttonDeleteEvent() {
  const buttons = document.querySelectorAll("[data-buttonDelete]");

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.buttondelete;

      const confirmacao = confirm(
        `Deseja mesmo deletar o pedido de ID #${id} ?`
      );

      if (!confirmacao) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/pedidos/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Erro ao deletar");

        alert("Pedido excluído com sucesso!");

        location.reload();
      } catch (error) {
        console.log(error);
      }
    });
  });
}
