export async function getListaReview() {
  const response = await fetch("https://agenda-yfs.vercel.app/meus-reviews", {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache", // Garante que não utiliza cache
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar avaliações");
  }

  const data = await response.json();
  return data.listaReview;
}
