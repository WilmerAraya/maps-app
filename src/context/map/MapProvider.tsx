import { LngLatBounds, Map, Marker, Popup, SourceSpecification } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { JSX, useContext, useEffect, useReducer } from 'react';

import { MapReducer } from './MapReducer';
import { MapActions } from '../../constants';
import { useTheme } from '@mui/material';
import { PlacesContext } from '../';

import { directionsApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/directions';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers?: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);
  const appTheme = useTheme();

  useEffect(() => {
    state.markers?.forEach((marker) => marker.remove());

    const newMarkers: Marker[] = [];

    for (const place of places) {
      const { longitude, latitude } = place.properties.coordinates;
      const popUp = new Popup().setHTML(`
          <h2>${place.properties.name}</h2>
          <p>${place.properties.full_address}</p>
      `);

      const marker = new Marker({ color: appTheme.palette.grey[500] })
        .setLngLat([longitude, latitude])
        .setPopup(popUp)
        .addTo(state.map!);
      newMarkers.push(marker);
    }

    dispatch({ type: MapActions.SET_MARKERS, payload: newMarkers });
  }, [places]);

  const myLocationPopup = new Popup().setHTML('<h3>You are here!</h3>');

  const setMap = (map: Map) => {
    const primaryColor = appTheme.palette.primary.main;
    new Marker({ color: primaryColor }).setLngLat(map.getCenter()).setPopup(myLocationPopup).addTo(map);

    dispatch({ type: MapActions.SET_MAP, payload: map });
  };

  const getRouteBeetweenPlaces = async (origin: [number, number], destination: [number, number]) => {
    const resp = await directionsApi.get<DirectionsResponse>(`/${origin.join(',')};${destination.join(',')}`);
    const { coordinates } = resp.data.routes[0].geometry;

    const bounds = new LngLatBounds(origin, origin);

    for (const coord of coordinates) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, { padding: 300 });

    const sourceData: SourceSpecification = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            id: 'route',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates,
            },
          },
        ],
      },
    };

    if (state.map?.getSource('route')) {
      state.map.removeLayer('route');
      state.map.removeSource('route');
    }

    state.map?.addSource('route', sourceData);
    state.map?.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': appTheme.palette.primary.main,
        'line-width': 4,
      },
    });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,

        // Methods
        setMap,
        getRouteBeetweenPlaces,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
