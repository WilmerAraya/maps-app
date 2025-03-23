import { JSX } from '@emotion/react/jsx-runtime';
import { PlacesContext } from './PlacesContext';
import { useEffect, useReducer } from 'react';
import { placesReducer } from './placesReducer';
import { getUserLocation } from '../../helpers/getUserLocation';
import { PlacesActions } from '../../constants';
import { searchApi } from '../../apis';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number]; // latitude, longitude. Optional
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({ type: PlacesActions.SET_USER_LOCATION, payload: lngLat })
    );
  }, []);

  const searchPlacesByQuery = async (query: string) => {
    if (query.length < 2) return [];
    if (!state.userLocation) throw new Error('User location not found');

    const resp = await searchApi.get('', {
      params: {
        q: query,
        proximity: state.userLocation.join(','),
      },
    });

    console.log(resp.data);

    return resp.data;
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,

        // Methods
        searchPlacesByQuery,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
