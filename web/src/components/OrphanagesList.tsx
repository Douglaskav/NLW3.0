import React, {useState, useEffect} from 'react';

import "../styles/pages/orphanage-admin.css";

import { Map, Marker, TileLayer } from "react-leaflet";

import iconMap from "../utils/mapIcon";
import ArrowIcon from "../images/arrow-left.svg";
import api from '../services/api';

interface OrphanageParams {
  id: number;
  name: string,
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean,
  images: [
    {
      id: number;
      url: string;
    }
  ]
  pending: boolean;
}
//                 <footer>
                  //  <h3>Orf. Crianças Autistas</h3>
                  //  <div className="buttons">
                  //    <Link to="/app">
                  //      <img src={TrashIcon} alt="Cadastrar"  />
                  //                  </Link>
                  //                  <Link to="/app/admin/confirm">
                  //      <img src={PenIcon} alt="Cadastrar"  />
                  //    </Link>
                  // </div>
                  // </footer>                

export default function OrphanagesList(props: { page: string | null }) {
  const [orphanages, setOrphanages] = useState([]);

  async function searchOrphanages() {
    const response = await api.get(
      props.page === 'registred' || props.page === null 
        ? '/orphanages' 
        : `/orphanages/${props.page}`
    );
    setOrphanages(response.data);
  }

  useEffect(() => {
    searchOrphanages();
  });

  return (
    <div className="admin-orphanages">
        <div className="titles">
          <h2>Cadastros {props.page === 'registred' || props.page === null ? 'Registrados' : 'Pendentes'}</h2>
          <small>{orphanages.length} Orfanato</small>
        </div>
        <ul className="orphanages">
          {orphanages.map((orphanage: OrphanageParams) => {
            return (
              <li key={orphanage.id}>
                <div className="map-container">
                  <Map 
                    center={[orphanage.latitude, orphanage.longitude]} 
                    zoom={16} 
                    style={{ width: '100%', height: 230 }}
                    dragging={false}
                    touchZoom={false}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                  >
                    <TileLayer 
                      url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                    />
                    <Marker interactive={false} icon={iconMap} position={[
                      orphanage.latitude, orphanage.longitude
                    ]}  />
                  </Map>

                  <footer>
                    <h3>{orphanage.name}</h3>
                    <div className="buttons">
                      <a href={`/app/confirm/${orphanage.id}`}> 
                        <img src={ArrowIcon} alt="Cadastrar"  />
                      </a>
                    </div>
                  </footer>
                </div>
              </li>
            ) 
          })}
        </ul>
      </div>
 
  )
}
