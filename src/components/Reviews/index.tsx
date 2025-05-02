import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FaPlus } from "react-icons/fa";
import { Dispatch, SetStateAction} from "react";
import { useQuery } from "@tanstack/react-query";
import { getListaReview } from "../../http/getListaReview";

import './reviews.css'

type dataReview = {
  id: string;
  name: string;
  reviews: string;
};

type Props = {
  handleForm: () => void;
  setChangePg: Dispatch<SetStateAction<number>>;
};

export default function Reviews({ handleForm, setChangePg }: Props) {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  const { data } = useQuery<dataReview[]>({
    queryKey: ["review"],
    queryFn: getListaReview,
  });

  function addReview() {
    setChangePg(4);
    handleForm();
  }

  return (
    <section className="reviews">
      <h1>Avaliações</h1>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {data && data.length > 0 ? (
            data?.map((item, index) => (
              <div className="embla__slide" key={index}>
                <h4>{item.name}</h4>
                <p>{item.reviews}</p>
              </div>
            ))
          ) : (
            <div className="embla__slide">
              <h4>Sem avaliações</h4>
              <p>Nenhuma avaliação foi adicionada</p>
            </div>
          )}
        </div>
      </div>
      <a className="bt-reviews" onClick={addReview}>
        Adicionar avaliação
        <FaPlus className="icon-bt-reviews" />
      </a>
    </section>
  );
}
