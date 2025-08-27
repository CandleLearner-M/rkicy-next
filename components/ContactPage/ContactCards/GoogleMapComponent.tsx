"use client";

import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import styles from "./ContactCards.module.scss";

// CFC Tower coordinates in Casablanca
const cfcTowerLocation = {
  lat: 33.5731104,
  lng: -7.6425342
};

const containerStyle = {
  width: '100%',
  height: '200px',
  borderRadius: '8px'
};

export default function GoogleMapComponent() {
  const [map, setMap] = useState(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY // You need to set this in your .env.local file
  });

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={cfcTowerLocation}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={cfcTowerLocation} title="CFC Tower" />
    </GoogleMap>
  ) : <div className={styles.mapLoading}>Loading map...</div>;
}