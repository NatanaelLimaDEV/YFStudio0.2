import { FaPlus } from "react-icons/fa";
import Form from "../Form";
import { Dispatch, SetStateAction } from "react";

import './welcome.css'

type Props = {
  handleForm: () => void,
  form: boolean,
  service?: string,
  changePg: number,
  setChangePg: Dispatch<SetStateAction<number>>,
}

export default function Welcome({ handleForm, form, service, changePg, setChangePg }: Props) {

  function moreInfo(){
    setChangePg(3)
    handleForm()
  }

  function schedule(){
    setChangePg(1)
    handleForm()
  }

  return (
    <section className="welcome">
      {form ? (
        <Form handleForm={handleForm} service={service} changePg={changePg} setChangePg={setChangePg}/>
      ) : (
        <div className="text-welcome">
          <div className="text">
            <h1>Bem-vinda ao nosso estúdio!</h1>
            <p>Onde suas mãos recebem o cuidado e a elegância que merecem!</p>
            <button onClick={schedule}>Agendar meu horário</button>
            <a className="more-info" onClick={moreInfo}>
              <FaPlus className="icon-info"/>
              Informações
            </a>
          </div>
          <div className="text-action">
            <p>Pronta para se sentir ainda mais linda? Agende agora!</p>
          </div>
        </div>
      )}
    </section>
  );
}
