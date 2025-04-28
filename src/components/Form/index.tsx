import { MdOutlineClose, MdSend } from "react-icons/md";
import { criarAgenda } from "../../http/criarAgenda";
import { useState } from "react";
import { toast } from "react-toastify";

import "./form.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import InputCalendar from "../InputCalendar";

type Props = {
  handleForm: () => void;
  form: boolean;
  service?: string;
};

export default function Form({ handleForm, service }: Props) {
  const [services, setServices] = useState("");
  const [name, setName] = useState("");
  const [music, setMusic] = useState("");
  const [date, setDate] = useState("");
  const [timeService, setTimeService] = useState<number[]>([]);

  const time: number[] = [];
  for (let i = 8; i < 23; i++) {
    time.push(i);
  }
  const index = time.indexOf(12);
  if (index !== -1) {
    time.splice(index, 1);
  }

  if (!services && service) {
    setServices(service);
  }

  function nextStep() {
    if (!services || !name) {
      toast.error("Preencha todos os campos obrigátorios!");
      return;
    }

    document.getElementById("step1")?.classList.remove("active");
    document.getElementById("step2")?.classList.add("active");
  }

  function returnStep() {
    document.getElementById("step2")?.classList.remove("active");
    document.getElementById("step1")?.classList.add("active");
  }

  const buttons = document.querySelectorAll(".button-time");
  const selectTime: number[] = [];

  function handleTime(t: number) {
    buttons.forEach((b) => b.classList.remove("select"));

    if (services === "Alongamento" || services === "Manutenção") {
      let cont = t + 4;
      if (t === 9 || t === 10 || t === 11) {
        cont++;
      }
      if (t === 20) {
        toast.error(
          `O procedimento selecionado( ${services} ) dura em média 4 horas!`
        );

        setTimeout(() => {
          toast.error("Selecione um horário que não exceda o expediente!");
        }, 2000);

        return;
      }

      for (let i = t; i < cont; i++) {
        document.getElementById(`click${i}`)?.classList.add("select");
        selectTime.push(i);
      }
    } else if (services === "Esmaltação" || services === "Banho em gel") {
      let cont = t + 3;
      if (t === 10 || t === 11) {
        cont++;
      }

      for (let i = t; i < cont; i++) {
        document.getElementById(`click${i}`)?.classList.add("select");
      }
    }

    setTimeService(selectTime);
  }

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!services || !name || !date || timeService.length === 0) {
      toast.error("Preencha todos os campos obrigátorios!");
      return;
    }

    criarAgenda({
      nome: name,
      email: "email@email.com",
      contato: "(00)00000-0000",
      data: date,
      hora: timeService,
      servico: services,
      musica: music || "",
      status: "Pendente",
      valor: "",
    });

    // Mensagem no WhatsApp
    const message = `Procedimento: ${services}%0ANome: ${name}%0AMúsica: ${music}%0AData: ${date}%0AHorário: 10:00h`;

    const phone = "558898072612";
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, "_blank");

    clearForm();
    handleForm();
  }

  function clearForm() {
    setServices("");
    setName("");
    setMusic("");
    setDate("");

    document.getElementById("step2")?.classList.remove("active");
    document.getElementById("step1")?.classList.add("active");
  }

  return (
    <form className="form" onSubmit={send}>
      <MdOutlineClose
        className="iconClosed"
        onClick={() => {
          handleForm();
          clearForm();
        }}
      />
      <div className="step active" id="step1">
        <div>
          <label htmlFor="service">Qual o tipo de procedimento?</label>
          <select
            id="service"
            value={services}
            onChange={(e) => setServices(e.target.value)}
          >
            <option value="" disabled>
              Clique para escolher
            </option>
            <option value="Alongamento">Alongamento</option>
            <option value="Manutenção">Manutenção</option>
            <option value="Esmaltação">Esmaltação</option>
            <option value="Banho em gel">Banho em gel</option>
          </select>
        </div>
        <div>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="music">Qual estilo de música você curte?</label>
          <input
            id="music"
            type="text"
            placeholder="Digite seu estilo favorito"
            value={music}
            onChange={(e) => setMusic(e.target.value)}
            autoComplete="off"
          />
        </div>
        <section className="buttonForm">
          <button className="next" type="button" onClick={nextStep}>
            Avançar
            <FaArrowCircleRight />
          </button>
        </section>
      </div>

      <div className="step" id="step2">
        <div>
          <label htmlFor="date">Selecione a data</label>
          <InputCalendar date={date} setDate={setDate} />
        </div>
        <div>
          <label htmlFor="">Selecione o horário</label>
          <div className="div-time">
            {time.map((t, index) => {
              return t === 21 || t === 22 ? (
                <button
                  key={index}
                  className="button-time disabled"
                  id={`click${t}`}
                  type="button"
                  onClick={() => handleTime(t)}
                  disabled
                >{`${t}:00`}</button>
              ) : (
                <button
                  key={index}
                  className="button-time"
                  id={`click${t}`}
                  type="button"
                  onClick={() => handleTime(t)}
                >{`${t}:00`}</button>
              );
            })}
          </div>
        </div>
        <section className="button-step-2">
          <button className="return next" type="button" onClick={returnStep}>
            <FaArrowCircleLeft />
            Voltar
          </button>
          <button className="send next" type="submit">
            Enviar
            <MdSend />
          </button>
        </section>
      </div>
    </form>
  );
}
