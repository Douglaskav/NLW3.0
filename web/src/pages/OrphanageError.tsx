import React from 'react';

import '../styles/pages/orphanage-success.css';
import Ilustration from '../images/error.png';
import {Link} from 'react-router-dom';

export default function OrphanageSuccessfully() {
  return (
    <div id="page-error">
      <div className="orphanage-created">
        <h1>Excluir!</h1>
        <p>Você tem certeza que quer excluir Orf. Esperança?</p>
        <Link to="/app">
          <button>Voltar para o mapa</button>
        </Link>
      </div>
      <img src={Ilustration} alt="Orphanage created with successfully" />
    </div>
  );
}
