const form = document.getElementById("formCriarCliente");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nome: form.nome.value.trim(),
    email: form.email.value.trim(),
  };

  try {
    const response = await fetch("http://localhost:3000/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Erro ao criar produto");

    resultado.textContent = "Cliente com sucesso!";
    resultado.className = "text-green-600 text-center font-semibold";

    form.reset();
  } catch (err) {
    resultado.textContent = "Falha ao criar produto.";
    resultado.className = "text-red-600 text-center font-semibold";
  }
});
