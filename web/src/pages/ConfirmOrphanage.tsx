import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from 'react-router-dom';

import { FiPlus } from "react-icons/fi";

import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import checkIcon from '../images/checkIcon.svg';
import XCircleIcon from '../images/x-circle.svg';

import api from '../services/api';

import '../styles/pages/create-orphanage.css';
import Switch from '../components/Switch';

export default function ConfirmOrphanage() {
  async function getOrphanageData() {
    const currentURL = window.location.href.split('/');
    const orphanageID = currentURL[currentURL.length-1];
    const orphanage = await api.get(`/orphanages/pending/${orphanageID}`);

    console.log(orphanage.data);
    setName(orphanage.data.name);
    setAbout(orphanage.data.about);
    setInstructions(orphanage.data.instructions);
    setOpeningHours(orphanage.data.opening_hours);
    setOpenOnWeekEnds(orphanage.data.open_on_weekends);
    setLocation([orphanage.data.latitude, orphanage.data.longitude]);
    setImages(orphanage.data.images);

    orphanage.data.images.forEach((image: any) => {
      console.log(image);
    })
  }

  useEffect(() => {
    getOrphanageData();
  }, [])

  const history = useHistory();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekEnds] = useState<boolean>(false);
  const [images, setImages] = useState<{ id: number, url: string }[]>([]);
  const [location, setLocation] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  function handleMapClick(event: LeafletMouseEvent) {
    setLocation([event.latlng.lat,event.latlng.lng]);
    // console.log(images); // [File, File]
    // console.log(previewImages); // ["blob:http://localhost:3000/8fc0d31b-fcd0-4910-9dd5-81c3cc3d9579", "blob:http://localhost:3000/d984c3df-35a3-4b15-bc6e-66fe932276a1"]
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);  

    const selectedImage = selectedImages.map(image => {
      console.log(image);
      return {
        id: image.size,
        url: URL.createObjectURL(image) 
      }
    });

    console.log(selectedImage);
    setImages(selectedImage);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(location[0]));
    data.append('longitude', String(location[1]));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image.url);
    });

    api.post('orphanages', data).then(() => {
      history.push('/app/success');
    })
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[location[0], location[1]]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { location[0] !== 0 
                ? <Marker 
                    interactive={false}
                    icon={mapIcon} 
                    position={[location[0], location[1]]} 
                  />
                : null
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={e => setAbout(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {images.map((image, index) => {
                  return (
                    <img key={index} src={image.url} alt="Foto do orfanato." />
                  );
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                <input multiple onChange={handleSelectImages} type="file" id="image[]" />
              </div>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions" 
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de funcionamento</label>
              <input 
                id="opening_hours" 
                value={opening_hours}
                onChange={e => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <div className="open_on_weekends_form">
                <label className="open_on_weekends">Aberto aos finais de semana</label>
                <Switch isOn={open_on_weekends} handleStateSwitch={() => setOpenOnWeekEnds(!open_on_weekends)} />
              </div>
            </div>
          </fieldset>

          <div className="action-buttons">
            <button className="cancel-button">
              <img src={XCircleIcon} alt="Recusar Orfanato" />
              Recusar
            </button>

            <button className="confirm-button" type="submit" disabled={
              !name || !about || !images || !instructions || !opening_hours || !!!location[0] || !!!location[1]
             }>
              <img src={checkIcon} alt="Confirmar Orfanato" />
              Confirmar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}


