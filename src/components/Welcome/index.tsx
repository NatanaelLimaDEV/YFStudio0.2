import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { toast } from "react-toastify";
import { criarAgenda } from "../../http/criarAgenda";
import InputCalendar from "../InputCalendar";

type Props = {
    handleForm: () => void,
    form: boolean,
    service?: string,
}

export default function Welcome({ handleForm, form, service }: Props) {
  const [services, setServices] = useState("")
  const [name, setName] = useState("")
  const [music, setMusic] = useState("")
  const [date, setDate] = useState(Date())

  const today = new Date()
  const [day, month, year] = today.toLocaleDateString('pt-BR').split('/')
  const todayInputDate = `${year}-${month}-${day}`;
  

  if(!services && service){
    setServices(service)
  }

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if(!services || !name || !date){
      toast.error("Preencha todos os campos obrigátorios!")
      return;
    }

    criarAgenda({
      nome: name || "",
      email: "email@email.com",
      contato: "(00)00000-0000",
      data: date || "",
      hora: "08:00h",
      servico: services || "",
      musica: music || "",
      status: "Pendente",
      valor: ""
    });

    // Mensagem no WhatsApp
    const message = `Procedimento: ${services}%0ANome: ${name}%0AMúsica: ${music}%0AData: ${date}%0AHorário: 10:00h`

    const phone = "558898072612"
    const url = `https://wa.me/${phone}?text=${message}`

    window.open(url, "_blank")

    clearForm()
    handleForm()
  }

  function clearForm(){
    setServices("")
    setName("")
    setMusic("")
    setDate("")
  }

  return (
    <section className="welcome">
      {form ? (
        <form className="form" onSubmit={send}>
          <MdOutlineClose className="iconClosed" onClick={() => {handleForm(); clearForm()}} />
          <div>
            <div>
              <label htmlFor="service">Qual o tipo de procedimento?</label>
              <select id="service" value={services} onChange={(e) => setServices(e.target.value)}>
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
              <input id="name" type="text" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="music">Qual estilo de música você curte?</label>
              <input
                id="music"
                type="text"
                placeholder="Digite seu estilo favorito"
                value={music}
                onChange={(e) => setMusic(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="date">Selecione o melhor dia e horário</label>
              {/* <input id="date" type="date" min={todayInputDate} value={date} onChange={(e) => setDate(e.target.value)}/> */}
              <InputCalendar />
            </div>
            <section className="buttonForm">
              <button className="send">Agendar</button>
              <button className="help">Ajuda?</button>
            </section>
          </div>
        </form>
      ) : (
        <div className="text-welcome">
          <div className="text">
            <h1>Bem-vinda ao nosso estúdio!</h1>
            <p>Onde suas mãos recebem o cuidado e a elegância que merecem!</p>
            <button onClick={handleForm}>Agendar meu horário</button>
          </div>
          <div className="text-action">
            <p>Pronta para se sentir ainda mais linda? Agende agora!</p>
          </div>
        </div>
      )}
    </section>
  );
}
