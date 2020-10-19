import React from 'react';

import '../styles/pages/orphanage-success.css';
import Ilustration from '../images/success.png';
import {Link} from 'react-router-dom';

export default function OrphanageSuccessfully() {
  return (
    <div id="page-success">
      <div className="orphanage-created">
        <h1>Ebaaa!</h1>
        <p>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)</p>
        <Link to="/app">
          <button>Voltar para o mapa</button>
        </Link>
      </div>
      <img src={Ilustration} alt="Orphanage created with successfully" />
    </div>
  );
}
