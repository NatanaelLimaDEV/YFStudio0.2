import { MdOutlineClose, MdSend } from "react-icons/md";
import { criarAgenda } from "../../http/criarAgenda";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import "./form.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import InputCalendar from "../InputCalendar";
import { useQuery } from "@tanstack/react-query";
import { getListaAgendamentos } from "../../http/getListaAgendamentos";
import { Dayjs } from "dayjs";
import MoreInfo from "../MoreInfo/inde";
import FormAddReview from "../FormAddReview";
import AlertDialog from "../AlertDialog";

type Props = {
  handleForm: () => void,
  service?: string,
  changePg: number,
  setChangePg: Dispatch<SetStateAction<number>>,
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

export default function Form({
  handleForm,
  service,
  changePg,
  setChangePg,
}: Props) {

  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogText, setDialogText] = React.useState("");

  const [services, setServices] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [music, setMusic] = useState("");
  const [date, setDate] = useState("");
  const [timeService, setTimeService] = useState<number[]>([]);
  const [scheduledTime, setScheduledTime] = useState<number[]>([]);

  const [checkDisabled, setCheckDisabled] = useState<number[]>();
  const [selectedIds, setSelectedIds] = useState<number[]>();

  console.log(changePg);


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
    if (!services || !name || !contact) {
      setOpenDialog(true);
      setDialogText("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    // Validar telefone
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!regex.test(contact)) {
      setOpenDialog(true);
      setDialogText("Número de telefone inválido! Use o formato (DD) 9XXXX-XXXX");
      return;
    }

    setChangePg(2)
  }

  function returnStep() {
    setSelectedIds([]);
    setCheckDisabled([]);
    setTimeService([]);
    setDate("");

    setChangePg(1)
  }

  function checkDay(day: Dayjs | null) {
    const dayFormat = day?.format("YYYY-MM-DD");
    // Procurar na lista de agendamentos se já existe algum agendamento para o dia selecionado
    const searchDate = data?.filter((item) => item.data === dayFormat);
    // Pegar todas as horas já agendadas para o dia selecionado
    const agendaTime = searchDate?.map((item) => item.hora).flat() ?? [];

    listTime(services || "", agendaTime);

    setScheduledTime(agendaTime);
  }

  function listTime(service: string, agendaTime: number[]) {
    // Definir os horários que devem ser desabilitados com base no serviço selecionado
    let check: number[] = [...agendaTime];
    if (service === "Alongamento" || service === "Manutenção") {
      check = [...agendaTime, 20, 21, 22];
    } else if (service === "Esmaltação" || service === "Banho em gel") {
      check = [...agendaTime, 21, 22];
    }

    // Remover os horários que já foram agendados
    setCheckDisabled([...new Set(check)]);
    setTimeService([]);
    setSelectedIds([]);
  }

  function handleTime(t: number) {
    // Validar se a data foi selecionada
    if (!date) {
      setOpenDialog(true);
      setDialogText("Selecione uma data para listar os horários!");
      return;
    }

    // Validar se a data selecionada é anterior a data atual
    const today = new Date();
    if (date < today.toISOString().split("T")[0]) {
      setOpenDialog(true);
      setDialogText("Selecione uma data válida!");
      return;
    }

    setSelectedIds([]);
    setTimeService([]);
    const newSelected: number[] = [];

    if (services === "Alongamento" || services === "Manutenção") {
      const cont = t + 4;

      for (let i = t; i < cont; i++) {
        if (scheduledTime.includes(i)) {
          setOpenDialog(true);
          setDialogText(`Ops! A hora ${i}:00h já está agendada! \nO tipo de proceidmento ${services} tem uma duração de 4 horas!`);

          setSelectedIds([]);
          setTimeService([]);
          return;
        }
        newSelected.push(i);
        setTimeService((prev) => [...prev, i]);
      }
    } else if (services === "Esmaltação" || services === "Banho em gel") {
      const cont = t + 3;

      for (let i = t; i < cont; i++) {
        if (scheduledTime.includes(i)) {
          setOpenDialog(true);
          setDialogText(`Ops! A hora ${i}:00h já está agendada! \nO tipo de proceidmento ${services} tem uma duração de 3 horas!`);

          setSelectedIds([]);
          setTimeService([]);
          return;
        }
        newSelected.push(i);
        setTimeService((prev) => [...prev, i]);
      }
    }

    setSelectedIds(newSelected);
  }

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!services || !name || !date || timeService.length === 0) {
      setOpenDialog(true);
      setDialogText("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    criarAgenda({
      nome: name,
      email: "Não informado",
      contato: contact,
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
    const message = `Procedimento: ${services}%0ANome: ${name}%0AMúsica: ${music ? music : "Não informado"
      }%0AData: ${formattedDate}%0AHorário: ${timeService[0]}:00h às ${timeService[timeService.length - 1]
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
    setTimeService([]);

    setChangePg(0)
  }

  return (
    <div className="form">
      <MdOutlineClose
        className="iconClosed"
        onClick={() => {
          handleForm();
          clearForm();
        }}
      />

      <div className={`step ${changePg == 4 ? "active" : ""}`} id="step4">
        <FormAddReview handleForm={handleForm} setChangePg={setChangePg} />
      </div>

      <div className={`step ${changePg == 3 ? "active" : ""}`} id="step3">
        <MoreInfo />
      </div>

      <form className="form-schedule" onSubmit={send}>
        <div className={`step ${changePg === 1 ? "active" : ""}`} id="step1">
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
            <label htmlFor="name">Contato</label>
            <input
              id="contact"
              type="tel"
              placeholder="Digite seu número para contato"
              value={contact}
              onChange={(e) => {
                // Remover caracteres não numéricos
                let value = e.target.value.replace(/\D/g, "");

                // Limitar a 11 dígitos (DD + número)
                if (value.length > 11) value = value.slice(0, 11);

                // Formatar o telefone
                if (value.length > 6) {
                  value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                } else if (value.length > 2) {
                  value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                }
                setContact(value);
              }}
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
        <div className={`step ${changePg === 2 ? "active" : ""}`} id="step2">
          <div>
            <label htmlFor="date">Selecione a data</label>
            <InputCalendar date={date} setDate={setDate} checkDate={checkDay} />
          </div>
          <div>
            <label htmlFor="">Selecione o horário</label>
            <div className="div-time">
              {
                // Listar os botões de horário
                time.map((t, index) => {
                  return (
                    <button
                      key={index}
                      className={`button-time ${checkDisabled?.includes(t) ? "disabled" : ""
                        } ${selectedIds?.includes(t) ? "select" : ""}`}
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

      <AlertDialog text={dialogText} open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
}
