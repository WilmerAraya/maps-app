import { useContext, useLayoutEffect, useRef } from 'react';
import { Map } from 'mapbox-gl';
import { Box, useTheme } from '@mui/material';

import { MapContext, PlacesContext } from '../context';
import { Loading } from './Loading';

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapContainer = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useLayoutEffect(() => {
    if (!isLoading && mapContainer.current) {
      mapContainer.current.innerHTML = '';

      const mapStyle =
        theme.palette.mode === 'dark'
          ? 'mapbox://styles/mapbox/dark-v11' // Dark theme style
          : 'mapbox://styles/mapbox/light-v11'; // Light theme style

      const map = new Map({
        container: mapContainer.current!, // container ID
        style: mapStyle, // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });

      setMap(map);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return <Box ref={mapContainer} sx={{ height: '100vh', width: '100vw' }}></Box>;
};
