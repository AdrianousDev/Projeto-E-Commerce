export default function logout() {
  const logoutBtn = document.querySelector("#logoutBtn");

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("cliente");
    location.reload();
  });
}
