import React, {useState} from 'react';

import "../styles/pages/forget-password.css";
import Banner from "../components/Banner";

import Arrow from "../images/Arrow.svg";
import {Link} from 'react-router-dom';

export default function ForgetPassword() {
  const [email, setEmail] = useState<string>('');

  return (
    <div id="forget-password">
      <div className="back">
        <Link to="/app/login">
          <img src={Arrow} alt="Voltar" />
        </Link>
      </div>
      <Banner />
      <div className="container-forget">
        <h2>Esqueci a senha</h2>
        <p>Sua redefinação de senha será enviada para o e-mail cadastrado.</p>

        <label className="input-label" htmlFor="email">E-mail</label>
        <input 
          type="email"
          name="email"
          onChange={value => setEmail(value.target.value)}
          value={email}
        />

        <button 
          type="submit" 
          className="confirm-button"
          disabled={ !email }
         >
          Enviar
         </button>
      </div>
    </div> 
  );
}
