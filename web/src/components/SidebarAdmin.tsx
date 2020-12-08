import React from 'react';

import mapMarketImg from '../images/Local.svg';
import ShutdownImage from '../images/Shutdown.svg';

import '../styles/components/SidebarAdmin.css';

import LocationIcon from '../images/map-pin.svg';
import InfoCircleIcon from '../images/alert-circle.svg';

import {Link} from 'react-router-dom';

export default function Sidebar() {

  return (
    <aside className="app-sidebar-admin">
      <img src={mapMarketImg} alt="Happy" />

      <nav>
        <Link to="/" type="button" className="sidebar-admin-button">
          <img src={LocationIcon} alt="Orfanatos Cadastrados" />
        </Link>
        <Link to="/" type="button" className="sidebar-admin-button active">
          <img src={InfoCircleIcon} alt="Cadastrados Pendentes" />
        </Link> 
      </nav>

      <footer>
        <button type="button">
          <img src={ShutdownImage} alt="Sair" />
        </button>
      </footer>
    </aside>
  );
}
