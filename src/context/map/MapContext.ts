import { Map } from 'mapbox-gl';
import { createContext } from 'react';

interface MapContextProps {
  isMapReady: boolean;
  map?: Map;

  // Methods
  setMap: (map: Map) => void;
  getRouteBeetweenPlaces: (origin: [number, number], destination: [number, number]) => Promise<void>;
}

export const MapContext = createContext<MapContextProps>({} as MapContextProps);
