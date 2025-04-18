"use clinet";

import "./home.css";
import logo from "../../assets/ftUnhas/logo.png";
import unha1 from "../../assets/ftUnhas/Unha1.png";
import unha2 from "../../assets/ftUnhas/Unha2.png";
import unha4 from "../../assets/ftUnhas/Unha4.png";

import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";

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

export default function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div className="container">
      <section className="logo">
        <img src={logo} />
      </section>
      <div className="container-center">
        <section className="welcome">
          <div className="text-welcome">
            <div className="text">
              <h1>Bem-vinda ao nosso estúdio!</h1>
              <p>Onde suas mãos recebem o cuidado e a elegância que merecem!</p>
              <button>Agendar meu horário</button>
            </div>
            <div className="text-action">
              <p>Pronta para se sentir ainda mais linda? Agende agora!</p>
            </div>
          </div>
        </section>
        <section className="services">
          <h1>Serviços</h1>
          <div>
            <div>
              <img src={unha2} />
              <div className="select-service">
                <h4>Banho em gel</h4>
                <button>Selecionar</button>
              </div>
            </div>
            <div>
              <img src={unha1} />
              <div className="select-service">
                <h4>Esmaltação</h4>
                <button>Selecionar</button>
              </div>
            </div>
            <div>
              <img src={unha4} />
              <div className="select-service">
                <h4>Alongamento</h4>
                <button>Selecionar</button>
              </div>
            </div>
          </div>
        </section>
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
      </div>
      <section className="footer">
        <a>
          <FaWhatsapp />
          <span>WhatsApp</span>
        </a>
        <a>
          <FaInstagram />
          <span>Instagram</span>
        </a>
        <a>
          <SlLocationPin />
          <span>Localização</span>
        </a>
      </section>
      {/* <Link to="/illustration">Mudar</Link>
      <div>
        <RoutesApp />
      </div> */}
    </div>
  );
}
