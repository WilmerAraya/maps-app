import { JSX } from '@emotion/react/jsx-runtime';
import { PlacesContext } from './PlacesContext';
import { useEffect, useReducer } from 'react';
import { placesReducer } from './placesReducer';
import { getUserLocation } from '../../helpers/getUserLocation';
import { PlacesActions } from '../../constants';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number]; // latitude, longitude. Optional
}

const INITIAL_STATE: PlacesState = {
  isLoading: false,
  userLocation: undefined,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation()
      .then((lngLat) =>
        dispatch({ type: PlacesActions.SET_USER_LOCATION, payload: lngLat })
      )
      .catch(() => {
        console.error('Error getting user location');
      });
  }, []);

  return (
    <PlacesContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
