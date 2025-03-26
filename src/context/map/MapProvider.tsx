import { LngLatBounds, Map, Marker, Popup, SourceSpecification } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { JSX, useContext, useEffect, useReducer, useRef, useState } from 'react';

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

  const routeMarkerRef = useRef<Marker | null>(null);
  const destinationMarkerRef = useRef<Marker | null>(null);
  const [destinationPlaceId, setDestinationPlaceId] = useState<string | null>(null);

  // Este efecto solo se encarga de los marcadores de búsqueda normales
  useEffect(() => {
    // Eliminar todos los marcadores de búsqueda anteriores
    state.markers?.forEach((marker) => {
      // No eliminar el marcador de destino si existe
      if (destinationMarkerRef.current && marker === destinationMarkerRef.current) {
        return;
      }
      marker.remove();
    });

    const newMarkers: Marker[] = [];

    // Mantener el marcador de destino si existe
    if (destinationMarkerRef.current) {
      newMarkers.push(destinationMarkerRef.current);
    }

    // Crear marcadores para los lugares de búsqueda
    for (const place of places) {
      const { longitude, latitude } = place.properties.coordinates;
      const coords: [number, number] = [longitude, latitude];

      // No crear un nuevo marcador si ya es el destino
      if (destinationPlaceId && place.id === destinationPlaceId) {
        continue;
      }

      const popUp = new Popup().setHTML(`
          <h2>${place.properties.name}</h2>
          <p>${place.properties.full_address}</p>
      `);

      const marker = new Marker({ color: appTheme.palette.grey[500] })
        .setLngLat(coords)
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

  const getRouteBeetweenPlaces = async (
    origin: [number, number],
    destination: [number, number],
    destinationPlaceId: string
  ) => {
    const resp = await directionsApi.get<DirectionsResponse>(`/${origin.join(',')};${destination.join(',')}`);
    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates } = geometry;

    // Guardar el ID del lugar de destino
    setDestinationPlaceId(destinationPlaceId);

    // Buscar el lugar por su ID
    const destinationPlace = places.find((place) => place.id === destinationPlaceId);

    // Si ya existe un marcador de destino, eliminarlo
    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.remove();
    }

    // Crear el popup con la información del lugar si existe
    let popupHtml = '<h3>Destination</h3>';

    if (destinationPlace) {
      popupHtml = `
        <h2>${destinationPlace.properties.name}</h2>
        <p>${destinationPlace.properties.full_address}</p>
        <p><strong>Destination</strong></p>
      `;
    }

    // Crear un nuevo marcador de destino con un color distintivo
    destinationMarkerRef.current = new Marker({ color: appTheme.palette.success.main })
      .setLngLat(destination)
      .setPopup(new Popup().setHTML(popupHtml))
      .addTo(state.map!);

    const midPointIndex = Math.floor(coordinates.length / 2);
    const midPoint: [number, number] = [coordinates[midPointIndex][0], coordinates[midPointIndex][1]];

    const distanceKm = (distance / 1000).toFixed(1);
    const durationMin = Math.round(duration / 60);

    const routePopup = new Popup({ closeOnClick: true }).setHTML(`
      <h3>Distance: ${distanceKm} km</h3>
      <h3>Duration: ${durationMin} min</h3>
    `);

    if (routeMarkerRef.current) {
      routeMarkerRef.current.remove();
    }

    routeMarkerRef.current = new Marker({ color: appTheme.palette.secondary.main })
      .setLngLat(midPoint)
      .setPopup(routePopup)
      .addTo(state.map!)
      .togglePopup();

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

  const clearRoute = () => {
    // Remover el marcador de ruta
    if (routeMarkerRef.current) {
      routeMarkerRef.current.remove();
      routeMarkerRef.current = null;
    }

    // Remover el marcador de destino
    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.remove();
      destinationMarkerRef.current = null;
    }

    // Limpiar el ID de destino
    setDestinationPlaceId(null);

    // Remover la capa y fuente de la ruta
    if (state.map?.getSource('route')) {
      state.map.removeLayer('route');
      state.map.removeSource('route');
    }
  };

  return (
    <MapContext.Provider
      value={{
        ...state,

        // Methods
        setMap,
        getRouteBeetweenPlaces,
        clearRoute,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
