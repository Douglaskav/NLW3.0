import React from "react";

import '../styles/pages/landing.css';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from "../images/Logo.svg";

export default function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <div className="happy-content">
          <img src={logoImg} alt="Happy" /> 
          <div className="location">
            <strong>Rio Grande do Norte</strong>
            <span>Mossoró</span>
          </div>
        </div>

        <main>
          <h1>Leve felicidade para o mundo.</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <Link to="/app/login" className="landing-btn">Acesso Restrito</Link>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  )
}
