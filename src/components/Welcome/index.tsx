import Form from "../Form";

type Props = {
    handleForm: () => void,
    form: boolean,
    service?: string,
}

export default function Welcome({ handleForm, form, service }: Props) {

  return (
    <section className="welcome">
      {form ? (
        <Form handleForm={handleForm} form={form} service={service} />
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
