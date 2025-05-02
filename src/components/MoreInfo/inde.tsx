import { FaArrowRight, FaCircle, FaCoins, FaWhatsapp } from "react-icons/fa";
import "./moreInfo.css";

const services = {
  alongamento: 80,
  manutencao: 60,
  esmaltacao: 30,
  banho: 50,
};

export default function MoreInfo() {
  return (
    <div className="more-info-pg">
      <div className="price">
        <h1>
          <FaCoins /> Tabela de preços
        </h1>
        <ul className="list-price">
          <li>
            <span>
                <FaCircle className="icon-price" />
                Alongamento em gel <FaArrowRight className="icon-price" />
            </span> 
            <span>R$ {services.alongamento},00</span>
          </li>
          <li>
            <span>
                <FaCircle className="icon-price" />
                Manutenção <FaArrowRight className="icon-price" />
            </span>
            <span>R$ {services.manutencao},00</span>
          </li>
          <li>
            <span>
              <FaCircle className="icon-price" />
              Esmaltação em gel <FaArrowRight className="icon-price" />
            </span>
            <span>R$ {services.esmaltacao},00</span>
          </li>
          <li>
            <span>
              <FaCircle className="icon-price" />
              Banho em gel <FaArrowRight className="icon-price" />
            </span>
            <span>R$ {services.banho},00</span>
          </li>
        </ul>
      </div>
      <div className="contact">
        <span>Para mais informações, entre em contato!</span>
        <button>
          <FaWhatsapp /> WhatsApp
        </button>
      </div>
    </div>
  );
}
