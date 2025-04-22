"use clinet";

import "./home.css";
import "./mediaQueries.css";
import logo from "../../assets/ftUnhas/logo.png";
import Services from "../../components/Services";
import Reaviews from "../../components/Reviews";
import Footer from "../../components/Footer";
import Welcome from "../../components/Welcome";
import { useState } from "react";

export default function Home() {

  const [form, setForm] = useState(false);
  const [service, setService] = useState("")

  function handleForm() {
    setForm((prev) => !prev);
    setService("")
  }

  function selectService(service: string){
    setService(service)
    setForm((prev) => !prev);
  }

  return (
    <div className="container">
      <section className="logo">
        <img src={logo} />
      </section>
      <div className="container-center">
        <Welcome handleForm={handleForm} form={form} service={service}/>
        {form ? (
          <></>
        ):(
        <><Services selectService={selectService} /><Reaviews /></>
        )}
        
      </div>
      <Footer/>
    </div>
  );
}
