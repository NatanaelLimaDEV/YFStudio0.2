import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

type Props = {
    handleForm: () => void,
    form: boolean,
}

export default function Welcome({ handleForm, form }: Props) {

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section className="welcome">
      {form ? (
        <form className="form" onSubmit={send}>
          <MdOutlineClose className="iconClosed" onClick={handleForm} />
          <div>
            <div>
              <label htmlFor="service">Qual o tipo de procedimento?</label>
              <select id="service">
                <option value="" disabled selected>
                  Clique para escolher
                </option>
                <option value="Alongamento">Alongamento</option>
                <option value="Manutenção">Manutenção</option>
                <option value="Esmaltação">Esmaltação</option>
              </select>
            </div>
            <div>
              <label htmlFor="name">Nome</label>
              <input id="name" type="text" placeholder="Digite seu nome" />
            </div>
            <div>
              <label htmlFor="music">Qual estilo de música você curte?</label>
              <input
                id="music"
                type="text"
                placeholder="Digite seu estilo favorito"
              />
            </div>
            <div>
              <label htmlFor="date">Selecione o melhor dia e horário</label>
              <input id="date" type="date" />
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
