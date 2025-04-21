import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const reviews = [
  {
    name: "Camila Duarte",
    review:
      "Simplesmente amei o resultado! Minhas unhas nunca ficaram tão lindas e delicadas. O capricho em cada detalhe do design é impressionante. Com certeza voltarei mais vezes!",
  },
  {
    name: "Juliana Reis",
    review:
      "Fiquei encantada com o atendimento e o profissionalismo. O nail design ficou moderno, bem acabado e exatamente como eu pedi. Me senti super bem cuidada!",
  },
  {
    name: "Renata Oliveira",
    review:
      "Serviço de altíssima qualidade! A profissional tem mãos de fada e um cuidado incrível com cada etapa. Saí de lá me sentindo renovada e com as unhas dos sonhos.",
  },
  {
    name: "Amanda Lemos",
    review:
      "Amei cada detalhe! A profissional foi super atenciosa e caprichosa. Minhas unhas ficaram simplesmente perfeitas, do jeitinho que eu imaginei. Já quero voltar!",
  },
];

export default function Reaviews() {

    const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <section className="reviews">
      <h1>Avaliações</h1>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {reviews.map((item, index) => (
            <div className="embla__slide" key={index}>
              <h4>{item.name}</h4>
              <p>{item.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
