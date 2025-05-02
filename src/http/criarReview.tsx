type dadosReview = {
    name: string;
    reviews: string;
  };
  
  export async function criarReview({
    name,
    reviews,
  }: dadosReview) {
    await fetch("https://agenda-yfs.vercel.app/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        reviews,
      }),
    });
  }
  