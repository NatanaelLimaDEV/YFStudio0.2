import { MdOutlineClose, MdSend } from "react-icons/md";
import { criarAgenda } from "../../http/criarAgenda";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./form.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import InputCalendar from "../InputCalendar";
import { useQuery } from "@tanstack/react-query";
import { getListaAgendamentos } from "../../http/getListaAgendamentos";
import { Dayjs } from "dayjs";

type Props = {
  handleForm: () => void;
  form: boolean;
  service?: string;
};

type dataAgenda = {
  id: string;
  nome: string;
  email: string;
  contato: string;
  data: string;
  hora: number[];
  servico: string;
  musica: string;
  status: string;
  valor: string;
};

export default function Form({ handleForm, service }: Props) {
  const [services, setServices] = useState("");
  const [name, setName] = useState("");
  const [music, setMusic] = useState("");
  const [date, setDate] = useState("");
  const [timeService, setTimeService] = useState<number[]>([]);
  const [scheduledTime, setScheduledTime] = useState<number[]>([]);

  const [step, setStep] = useState(1)
  const [checkDisabled, setCheckDisabled] = useState<number[]>()
  const [selectedIds, setSelectedIds] = useState<number []>()

  const { data } = useQuery<dataAgenda[]>({
    queryKey: ["agenda"],
    queryFn: getListaAgendamentos,
  });

  const time: number[] = [];
  for (let i = 8; i < 23; i++) {
    time.push(i);
  }

  useEffect(() => {
    if (service) {
      setServices(service);
    }
  }, [service]);

  function nextStep() {
    if (!services || !name) {
      toast.error("Preencha todos os campos obrigátorios!");
      return;
    }

    setStep(2)
  }

  function returnStep() {
    setSelectedIds([])
    setCheckDisabled([])
    setTimeService([]);
    setDate("");

    setStep(1)
  }

  function checkDay(day: Dayjs | null) {
    const dayFormat = day?.format("YYYY-MM-DD");
    const searchDate = data?.filter((item) => item.data === dayFormat);
    const agendaTime = searchDate?.map((item) => item.hora).flat() ?? [];

    listTime(services || "", agendaTime);

    setScheduledTime(agendaTime);
  }

  function listTime(service: string, agendaTime: number[]) {

    let check: number[] = [...agendaTime]
    if (service === "Alongamento" || service === "Manutenção") {
      check = [...agendaTime, 20, 21, 22]
    } else if (service === "Esmaltação" || service === "Banho em gel") {
      check = [...agendaTime, 21, 22]
    }

    
    setCheckDisabled([...new Set(check)])
    setTimeService([])
    setSelectedIds([])
  }

  function handleTime(t: number) {
    if(!date){
      toast.error("Selecione uma data para listar os horários!")
      return
    }

    setSelectedIds([])
    setTimeService([])
    const newSelected: number[] = [];

    if (services === "Alongamento" || services === "Manutenção") {
      let cont = t + 4;

      for (let i = t; i < cont; i++) {
        if (scheduledTime.includes(i)) {
          toast.error(`Ops! A hora ${i}:00h já está agendada!`);
          toast.info(`O tipo de proceidmento ${services} dura 4 horas!`);

          setSelectedIds([])
          setTimeService([])
          return;
        }
        newSelected.push(i)
        setTimeService((prev) => [...prev, i])
      }
    } else if (services === "Esmaltação" || services === "Banho em gel") {
      let cont = t + 3;

      for (let i = t; i < cont; i++) {
        if (scheduledTime.includes(i)) {
          toast.error(`Ops! A hora ${i}:00h já está agendada!`);
          toast.info(`O tipo de proceidmento ${services} dura 3 horas!`);

          setSelectedIds([])
          setTimeService([])
          return;
        }
        newSelected.push(i)
        setTimeService((prev) => [...prev, i])
      }
    }

    setSelectedIds(newSelected)
  }

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!services || !name || !date || timeService.length === 0) {
      toast.error("Preencha todos os campos obrigátorios!");
      return;
    }

    criarAgenda({
      nome: name,
      email: "Não informado",
      contato: "Não informado",
      data: date,
      hora: timeService,
      servico: services,
      musica: music || "Não informado",
      status: "Pendente",
      valor: "Não informado",
    });

    // Formatar data dd/mm/yyyy
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    // Mensagem no WhatsApp
    const message = `Procedimento: ${services}%0ANome: ${name}%0AMúsica: ${
      music ? music : "Não informado"
    }%0AData: ${formattedDate}%0AHorário: ${timeService[0]}:00h às ${
      timeService[timeService.length - 1]
    }:00h`;

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
    setTimeService([])

    setStep(1)
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
      <div className={`step ${step === 1 ? "active" : ""}`} id="step1">
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

      <div className={`step ${step === 2 ? "active" : ""}`} id="step2">
        <div>
          <label htmlFor="date">Selecione a data</label>
          <InputCalendar
            date={date}
            setDate={setDate}
            checkDate={checkDay}
          />
        </div>
        <div>
          <label htmlFor="">Selecione o horário</label>
          <div className="div-time">
            {time.map((t, index) => {
              return (
                <button
                  key={index}
                  className={`button-time ${checkDisabled?.includes(t) ? "disabled" : ""} ${selectedIds?.includes(t) ? "select" : ""}`}
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
