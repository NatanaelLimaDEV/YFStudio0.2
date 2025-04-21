import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";

export default function Footer() {
  return (
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
  );
}
