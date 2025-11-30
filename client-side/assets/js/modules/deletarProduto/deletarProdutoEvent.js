export default function deletarProdutoEvent() {
  const form = document.getElementById("formDeletarProduto");
  const select = document.getElementById("selectProdutos");
  const resultado = document.getElementById("resultado");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = select.value;
    console.log(id);

    if (!id) return;

    try {
      const response = await fetch(`http://localhost:3000/produto/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao deletar");

      resultado.textContent = "Produto deletado com sucesso!";
      resultado.className = "text-green-600 text-center font-semibold";

      select.querySelector(`option[value="${id}"]`).remove();
    } catch (err) {
      resultado.textContent = "Falha ao deletar o produto.";
      resultado.className = "text-red-600 text-center font-semibold";
    }
  });
}
