import realizarLogin, { mostrarNomeLogin } from "./realizarLogin.js";

export default function initLogin() {
  const loginBtn = document.querySelector("#logarButtonNav");
  const containerModal = document.querySelector('[data-modal="login"]');
  const botaoFechar = document.querySelector('[data-modal="loginFechar"]');

  function toggleModal(event) {
    if (event.currentTarget == botaoFechar) {
      containerModal.classList.remove("flex");
      containerModal.classList.add("hidden");
    } else {
      containerModal.classList.remove("hidden");
      containerModal.classList.add("flex");
    }

    function clickForaModal(event) {
      if (event.target === this) {
        containerModal.classList.remove("flex");
        containerModal.classList.add("hidden");
      }
    }

    botaoFechar.addEventListener("click", toggleModal);
    containerModal.addEventListener("click", clickForaModal);
  }

  loginBtn.addEventListener("click", (event) => {
    toggleModal(event);
  });

  realizarLogin();
  mostrarNomeLogin();
}
