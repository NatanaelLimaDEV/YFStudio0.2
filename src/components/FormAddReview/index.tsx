import { MdSend } from "react-icons/md";
import "./formAddReview.css";
import { criarReview } from "../../http/criarReview";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AlertDialog from "../AlertDialog";
import { toast } from "react-toastify";

type Props = {
  handleForm: () => void;
  setChangePg: Dispatch<SetStateAction<number>>;
};

export default function FormAddReview({ handleForm, setChangePg }: Props) {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogText, setDialogText] = React.useState("");

  const queryClient = useQueryClient();

  function sendReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(name === "" || review === "") {
      setOpenDialog(true);
      setDialogText("Por favor, preencha todos os campos.");
      return
    }

    criarReview({
      name: name,
      reviews: review,
    }).then(() => {
      queryClient.invalidateQueries({ queryKey: ["review"] });

      toast.success("Obrigado por deixar sua avaliação!");

      setChangePg(0);
      handleForm();
    });

    return
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

      <AlertDialog text={dialogText} open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
}
