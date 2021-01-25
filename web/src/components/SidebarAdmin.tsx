import React from 'react';

import mapMarketImg from '../images/Local.svg';
import ShutdownImage from '../images/Shutdown.svg';

import '../styles/components/SidebarAdmin.css';

import LocationIcon from '../images/map-pin.svg';
import InfoCircleIcon from '../images/alert-circle.svg';

import { Link } from 'react-router-dom';
import api from '../services/api';

export default function SidebarAdmin(props: { page: string | null }) {

  function handleLogout() {
    api.get('/users/logout');
  }

  return (
    <aside className="app-sidebar-admin">
      <a href="/app">
        <img src={mapMarketImg} alt="Happy" />
      </a>

      <nav>
        <Link to="/app/admin" type="button" className={props.page !== 'pending' ? 'sidebar-admin-button active' : 'sidebar-admin-button'}>
          <img src={LocationIcon} alt="Orfanatos Cadastrados" />
        </Link>
        <Link to="/app/admin?page=pending" type="button" className={props.page === 'pending' ? 'sidebar-admin-button active' : 'sidebar-admin-button'}>
          <img src={InfoCircleIcon} alt="Cadastrados Pendentes" />
        </Link> 
      </nav>

      <footer>
        <button type="button" onClick={handleLogout}>
          <img src={ShutdownImage} alt="Sair" />
        </button>
      </footer>
    </aside>
  );
}
