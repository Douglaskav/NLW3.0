import React, {useState} from "react";
import "../styles/pages/orphanage-login.css";

import Banner from "../components/Banner";

import Arrow from "../images/Arrow.svg";

import {Link} from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div id="page-login">
      <div className="back">
        <Link to="/">
          <img src={Arrow} alt="Voltar" />
        </Link>
      </div>
      <Banner />
      <div className="form">
        <form className="signin-form">
          <h2>Fazer Login.</h2>
          <label className="form-label" htmlFor="email">E-mail</label>
          <input 
            type="email"
            name="email"
            className="form-input" 
            value={email}
            onChange={value => setEmail(value.target.value)}
          />
          
          <label className="form-label" htmlFor="password"> Senha</label>
          <input 
            type="password"
            name="password"
            className="form-input"
            value={password}
            onChange={value => setPassword(value.target.value)}
          />
          <div className="checkbox">
            <div>
              <input type="checkbox" id="remind" />
              <label className="checkbox-label" htmlFor="remind">Lembrar-me</label>
            </div>

            <Link className="forget-password"  to="/app/forgetPassword">Esqueci Minha Senha</Link>
          </div>

          <button type="submit" className="confirm-button" disabled={ !email || !password } >Enviar</button>
        </form>        
      </div>
    </div>
  )
}
