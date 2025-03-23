import { Typography } from '@mui/material';
import { PlacesProvider } from './context';

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <Typography variant="h3">Hola mundo, DE NUEVO</Typography>
    </PlacesProvider>
  );
};
