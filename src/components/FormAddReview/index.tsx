import { MdSend } from "react-icons/md";
import "./formAddReview.css";
import { criarReview } from "../../http/criarReview";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  handleForm: () => void;
  setChangePg: Dispatch<SetStateAction<number>>;
};

export default function FormAddReview({ handleForm, setChangePg }: Props) {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const queryClient = useQueryClient();

  function sendReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    criarReview({
      name: name,
      reviews: review,
    }).then(() => {
      queryClient.invalidateQueries({ queryKey: ["review"] });
      
      toast.success("Obrigado por deixar sua avaliação!");

      setChangePg(0);
      handleForm();
    });
  }

  return (
    <div>
      <form className="form-review" onSubmit={sendReview}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Avaliação</label>
          <textarea
            name="review"
            placeholder="Deixe aqui sua opnião"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <div className="bt-form-review">
          <button className="send next" type="submit">
            Enviar
            <MdSend />
          </button>
        </div>
      </form>
    </div>
  );
}
