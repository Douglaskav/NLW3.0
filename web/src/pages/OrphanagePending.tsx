import React from "react";

import "../styles/pages/orphanage-pending.css";
import SidebarAdmin from "../components/SidebarAdmin";

import { Map, Marker, TileLayer } from "react-leaflet";

import iconMap from "../utils/mapIcon";

import ArrowIcon from "../images/arrow-left.svg";
import {Link} from "react-router-dom";

export default function OrphanagePending() {
  return (
    <div id="page-orphanage-pending">
      <SidebarAdmin />
      <div className="pending-orphanages">
        <div className="titles">
          <h2>Cadastros Pendentes</h2>
          <small>1 Orfanato</small>
        </div>
        <ul className="orphanages">
          <li>
            <div className="map-container">
              <Map 
                center={[-5.1883233,-37.3477039]} 
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
                <Marker interactive={false} icon={iconMap} position={[-5.1883233,-37.3477039]}  />
              </Map>

              <footer>
                <h3>Orf. Crianças Autistas</h3>
                <div className="buttons">
                  <Link to="/app">
                    <img src={ArrowIcon} alt="Cadastrar"  />
                  </Link>
                </div>
              </footer>
            </div>
          </li>
          <li>
            <div className="map-container">
              <Map 
                center={[-5.1883233,-37.3477039]} 
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
                <Marker interactive={false} icon={iconMap} position={[-5.1883233,-37.3477039]}  />
              </Map>

              <footer>
                <h3>Orf. Crianças Autistas</h3>
                <div className="buttons">
                  <Link to="/app">
                    <img src={ArrowIcon} alt="Cadastrar"  />
                  </Link>
                </div>
              </footer>           
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
