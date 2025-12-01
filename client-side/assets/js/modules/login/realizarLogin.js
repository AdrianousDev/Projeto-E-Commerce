import fetchCliente from "./fetchCliente.js";

export function mostrarNomeLogin() {
  const loginBtn = document.querySelector("#logarButtonNav");

  if (localStorage.getItem("cliente")) {
    const dadosCliente = JSON.parse(localStorage.getItem("cliente"));
    loginBtn.textContent = dadosCliente.nome;
  }
}

export default function realizarLogin() {
  const form = document.querySelector("#formLogin");
  const emailInput = document.querySelector("#loginEmail");
  const errorLogin = document.querySelector("#errorLogin");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;

    const cliente = await fetchCliente(email);

    if (cliente === null || !cliente) {
      errorLogin.innerText = "Usuário não existe. Faça seu cadastro!";
      return;
    }

    const dadosCliente = {
      nome: cliente.nome,
      email: cliente.email,
    };

    localStorage.setItem("cliente", JSON.stringify(dadosCliente));

    mostrarNomeLogin();
  });
}
