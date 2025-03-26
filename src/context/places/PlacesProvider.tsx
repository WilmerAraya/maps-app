import { JSX } from '@emotion/react/jsx-runtime';
import { PlacesContext } from './PlacesContext';
import { useEffect, useReducer } from 'react';
import { placesReducer } from './placesReducer';
import { getUserLocation } from '../../helpers/getUserLocation';
import { PlacesActions } from '../../constants';
import { searchApi } from '../../apis';
import { Feature, PlacesResponse } from '../../interfaces/places';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number]; // latitude, longitude. Optional
  searchQuery: string;
  isSearchingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  searchQuery: '',
  isSearchingPlaces: false,
  places: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((lngLat) => dispatch({ type: PlacesActions.SET_USER_LOCATION, payload: lngLat }));
  }, []);

  const searchPlacesByQuery = async (query: string): Promise<Feature[]> => {
    dispatch({ type: PlacesActions.SET_SEARCH_QUERY, payload: query });

    if (query.length === 0) {
      dispatch({ type: PlacesActions.SET_PLACES, payload: [] });
      return [];
    }
    if (!state.userLocation) throw new Error('User location not found');

    dispatch({ type: PlacesActions.SET_SEARCHING_PLACES });

    const resp = await searchApi.get<PlacesResponse>('', {
      params: {
        q: query,
        proximity: state.userLocation.join(','),
      },
    });

    dispatch({ type: PlacesActions.SET_PLACES, payload: resp.data.features });

    return resp.data.features;
  };

  const clearPlaces = () => {
    dispatch({ type: PlacesActions.SET_PLACES, payload: [] });
    dispatch({ type: PlacesActions.SET_SEARCH_QUERY, payload: '' });
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,

        // Methods
        searchPlacesByQuery,
        clearPlaces,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
