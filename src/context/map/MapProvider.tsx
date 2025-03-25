import { Map, Marker, Popup } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { JSX, useReducer } from 'react';
import { MapReducer } from './MapReducer';
import { MapActions } from '../../constants';
import { useTheme } from '@mui/material';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);
  const appTheme = useTheme();

  const myLocationPopup = new Popup().setHTML('<h5 style="color: #000;">You are here!</h5>');

  const setMap = (map: Map) => {
    const primaryColor = appTheme.palette.primary.main;
    new Marker({ color: primaryColor }).setLngLat(map.getCenter()).setPopup(myLocationPopup).addTo(map);

    dispatch({ type: MapActions.SET_MAP, payload: map });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,

        // Methods
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
