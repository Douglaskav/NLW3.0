import React, { useState } from "react";

import "../styles/pages/recived-email.css";
import Banner from "../components/Banner";

import OpenEye from "../images/eye.svg";
import CloseEye from "../images/eye-off.svg";

export default function RecivedEmailPage() {
  const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
  const [newPasswordAgainVisible, setNewPasswordAgainVisible] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');

  return (
    <div id="recived-email-page">
      <Banner />
      <div className="password-reset">
        <h2>Redefinição de senha</h2>
        <p>Escolha uma nova senha para você acessar o dashboard do Happy</p>
        <form>
          <label className="form-label" htmlFor="password">Nova senha</label>
          <div className="input">
            <input 
              type={!newPasswordVisible ? 'password' : 'text'} 
              name="password" 
              className="form-input"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            <img 
              src={!newPasswordVisible ? OpenEye : CloseEye}
              alt="Mostrar senha" 
              className="icon"
              onClick={() => setNewPasswordVisible(!newPasswordVisible)}
            />
          </div>
          <label className="form-label" htmlFor="passwordAgain">Repetir senha</label>  
          <div className="input">
           <input 
              type={!newPasswordAgainVisible ? 'password' : 'text'} 
              name="passwordAgain"
              className="form-input"
              onChange={e => setPasswordAgain(e.target.value)}
              value={passwordAgain}
            />
            <img 
              src={!newPasswordAgainVisible ? OpenEye : CloseEye}
              alt="Mostrar senha" 
              className="icon"
              onClick={() => setNewPasswordAgainVisible(!newPasswordAgainVisible)}
            />

          </div>
          <button 
            className="confirm-button"
            disabled={!password || !passwordAgain}  
          >
           Entrar
          </button>
        </form> 
      </div>
    </div>
  );
}
