import { createContext } from 'react';
import { Feature } from '../../interfaces/places';

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number]; // optional
  searchQuery: string;
  isSearchingPlaces: boolean;
  places: Feature[];

  // Methods
  searchPlacesByQuery: (query: string) => Promise<Feature[]>;
  clearPlaces: () => void;
}

export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);
