import React, { useEffect, useRef, useState } from 'react';
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from '@react-google-maps/api';
import LoadingBox from '../components/LoadingBox';
import Axios from 'axios';
import { USER_ADDRESS_MAP_CONFIRM } from '../constants/userConstants';
import { useDispatch } from 'react-redux';

const libs = ['places'];
const defaultLocation = { lat: 45.516, lng: -73.56 };

export default function MapScreen(props) {
  const [googleApiKey, setGoogleApiKey] = useState('');
  const [center, setCenter] = useState(defaultLocation);  // center je za mapu
  const [location, setLocation] = useState(center); // location je za marker

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const fetch = async () => { // fetch je async fja u kojoj saljemo zahtev na backend
      const { data } = await Axios('/api/config/google');
      setGoogleApiKey(data);
      getUserCurrentLocation();
    };
    fetch();
  }, []);

  const onLoad = (map) => {
    mapRef.current = map; // samo setujemo mapRed na mapu. ovo se poziva dole kod GoogleMap taga
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };
  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };
  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng(),
    });
  };
  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };
  const dispatch = useDispatch(); // useDispatch je iz reduxa. taj dispatch smo koristili izpod na 60 liniji 
  const onConfirm = () => {
    const places = placeRef.current.getPlaces();
    if (places && places.length === 1) {
      // dispatch select action
      dispatch({
        type: USER_ADDRESS_MAP_CONFIRM,
        payload: {
          lat: location.lat,
          lng: location.lng,
          address: places[0].formatted_address,
          name: places[0].name,
          vicinity: places[0].vicinity,
          googleAddressId: places[0].id,
        },
      });
      alert('lokacija uspesno odabrana.');
      props.history.push('/shipping');  // nakon uspesnog odabira idemo na shipping screen
    } else {
      alert('Unesite adresu');
    }
  };

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolokacija nije podrzana od strane ovog pretrazivaca.');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  return googleApiKey ? ( // u slucaju da postoji apiKey renderuj mapu, ako ne, onda prikazi onaj loading box
    <div className="full-container">
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id="smaple-map"
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="map-input-box">
              <input type="text" placeholder="Unesite adresu "></input>
              <button type="button" className="primary" onClick={onConfirm}>
                Potvrdi
              </button>
            </div>
          </StandaloneSearchBox>
          <Marker position={location} onLoad={onMarkerLoad}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <LoadingBox></LoadingBox>
  );
}
