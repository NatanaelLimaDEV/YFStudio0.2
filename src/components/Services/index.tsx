import unha1 from "../../assets/ftUnhas/Unha1.png";
import unha2 from "../../assets/ftUnhas/Unha2.png";
import unha4 from "../../assets/ftUnhas/Unha4.png";

export default function Services() {
  return (
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
  );
}
