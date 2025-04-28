import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";

export default function Footer() {
  return (
    <section className="footer">
      <a href="https://wa.me/558898072612?text=Olá! Estou interessada nos procedimentos e gostaria de mais informações." target="_blank">
        <FaWhatsapp />
        <span>WhatsApp</span>
      </a>
      <a href="https://www.instagram.com/yasmimfreitas_studio?igsh=bW96dTR1MmRvbG5y" target="_blank">
        <FaInstagram />
        <span>Instagram</span>
      </a>
      <a href="https://maps.app.goo.gl/nx74S7AYVJuhBSvL9" target="_blank">
        <SlLocationPin />
        <span>Localização</span>
      </a>
    </section>
  );
}
