import { useState } from "react";
import unha1 from "../../assets/ftUnhas/Unha1.png";
import unha2 from "../../assets/ftUnhas/Unha2.png";
import unha4 from "../../assets/ftUnhas/Unha4.png";

type Props = {
  selectService: (service: string) => void
}

export default function Services({selectService}: Props) {
  return (
    <section className="services">
      <h1>Serviços</h1>
      <div>
        <div>
          <img src={unha2} />
          <div className="select-service">
            <h4>Banho em gel</h4>
            <button onClick={() => selectService("Banho em gel")}>Selecionar</button>
          </div>
        </div>
        <div>
          <img src={unha1} />
          <div className="select-service">
            <h4>Esmaltação</h4>
            <button onClick={() => selectService("Esmaltação")}>Selecionar</button>
          </div>
        </div>
        <div>
          <img src={unha4} />
          <div className="select-service">
            <h4>Alongamento</h4>
            <button onClick={() => selectService("Alongamento")}>Selecionar</button>
          </div>
        </div>
      </div>
    </section>
  );
}
