import "./home.css";
import logo from "../../assets/ftUnhas/logo.png";
import unha1 from "../../assets/ftUnhas/Unha1.png";
import unha2 from "../../assets/ftUnhas/Unha2.png";
import unha4 from "../../assets/ftUnhas/Unha4.png";

import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";

export default function Home() {
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
          <div>
            <h4>Camila Duarte</h4>
            <p>Simplesmente amei o resultado! Minhas unhas nunca ficaram tão lindas e delicadas. O capricho em cada detalhe do design é impressionante. Com certeza voltarei mais vezes!</p>
          </div>
          {/* <div>
            <h4>Juliana Reis</h4>
            <p>Fiquei encantada com o atendimento e o profissionalismo. O nail design ficou moderno, bem acabado e exatamente como eu pedi. Me senti super bem cuidada!</p>
          </div> */}
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
