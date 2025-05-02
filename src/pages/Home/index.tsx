"use clinet";

import "./home.css";
import logo from "../../assets/ftUnhas/logo.png";
import Services from "../../components/Services";
import Reviews from "../../components/Reviews";
import Footer from "../../components/Footer";
import Welcome from "../../components/Welcome";
import { useState } from "react";

export default function Home() {

  const [form, setForm] = useState(false);
  const [service, setService] = useState("")
  const [changePg, setChangePg] = useState<number>(0);

  function handleForm() {
    setForm((prev) => !prev);
    setService("")
  }

  function selectService(service: string){
    setService(service)
    setForm((prev) => !prev);
    setChangePg(1)
  }

  return (
    <div className="container">
      <section className="logo">
        <img src={logo} />
      </section>
      <div className="container-center">
        <Welcome handleForm={handleForm} form={form} service={service} changePg={changePg} setChangePg={setChangePg}/>
        {form ? (
          <></>
        ):(
        <><Services selectService={selectService} /><Reviews handleForm={handleForm} setChangePg={setChangePg}/></>
        )}
        
      </div>
      <Footer/>
    </div>
  );
}
