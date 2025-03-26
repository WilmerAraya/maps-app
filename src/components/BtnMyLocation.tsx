import { Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context';

export const BtnMyLocation = () => {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const onClick = () => {
    if (!isMapReady) throw new Error('Map is not ready');
    if (!userLocation) throw new Error('User location is not available');

    map?.flyTo({
      zoom: 14,
      center: userLocation,
      essential: true,
    });
  };

  return (
    <Button
      variant="contained"
      sx={{
        position: 'fixed',
        left: '20px',
        bottom: '40px',
        zIndex: 99,
      }}
      endIcon={<LocationOnIcon />}
      onClick={onClick}
    >
      My Location
    </Button>
  );
};
