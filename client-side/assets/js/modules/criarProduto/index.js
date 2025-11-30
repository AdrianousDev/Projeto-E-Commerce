const form = document.getElementById("formCriarProduto");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    titulo: form.titulo.value.trim(),
    descricao: form.descricao.value.trim(),
    preco: Number(form.preco.value),
    categoria: form.categoria.value.trim(),
    estoque: Number(form.estoque.value),
  };

  try {
    const response = await fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Erro ao criar produto");

    resultado.textContent = "Produto criado com sucesso!";
    resultado.className = "text-green-600 text-center font-semibold";

    form.reset();
  } catch (err) {
    resultado.textContent = "Falha ao criar produto.";
    resultado.className = "text-red-600 text-center font-semibold";
  }
});
