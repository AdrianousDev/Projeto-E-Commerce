export default async function fetchCliente(email) {
  try {
    const response = await fetch(`http://localhost:3000/clientes/${email}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar cliente");
    }

    const dados = await response.json();

    return dados;
  } catch (error) {
    console.error("Erro no login:", error);
  }
}
