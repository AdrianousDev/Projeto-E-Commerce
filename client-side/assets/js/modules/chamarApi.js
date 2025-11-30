export default async function chamarApi(url) {
  try {
    const response = await fetch(url);
    const dados = await response.json();
    return dados;
  } catch (error) {
    console.error("Erro ao chamar api", error);
    return [];
  }
}
