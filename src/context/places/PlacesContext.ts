import { createContext } from 'react';

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number]; // optional
}

export const PlacesContext = createContext({});
