type dadosAgenda = {
  nome: string;
  email: string;
  contato: string;
  data: string;
  hora: number[];
  servico: string;
  musica: string;
  status: string;
  valor: string;
};

export async function criarAgenda({
  nome,
  email,
  contato,
  data,
  hora,
  servico,
  musica,
  status,
  valor,
}: dadosAgenda) {
  await fetch("https://agenda-yfs.vercel.app/agenda", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome,
      email,
      contato,
      data,
      hora,
      servico,
      musica,
      status,
      valor,
    }),
  });
}
