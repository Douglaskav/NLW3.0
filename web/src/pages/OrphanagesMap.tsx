import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/Local.svg';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

import '../styles/pages/orphanages-map.css';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanangesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [location, setLocation] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, [])


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(foundLocation, noLocation, { maximumAge:60000, timeout:5000, enableHighAccuracy:true });
  }, []);

  function foundLocation(position: any) {
    setLocation([position.coords.latitude, position.coords.longitude]);
  }

  function noLocation() {
    alert('A gente precisa de sua permissão para encontrar os orfanatos proximos de você.');
  }

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa.</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Mossoró</strong>
          <span>Rio Grande Do Norte</span>
        </footer>
      </aside>

      <Map
        center={[location[0], location[1]]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />


      {orphanages.map(orphanage => {
        return (
          <Marker
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}        
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              {orphanage.name}
              <Link to={`/orphanage/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        )
      })}
      </Map>

      <Link to="/orphanage/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}

export default OrphanangesMap;
