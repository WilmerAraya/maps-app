import { useContext } from 'react';
import { PlacesContext } from '../context';
import { Box } from '@mui/material';
import { Loading } from './Loading';

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);

  if (isLoading) {
    return <Loading />;
  }

  return <Box>{userLocation?.join(', ')}</Box>;
};
