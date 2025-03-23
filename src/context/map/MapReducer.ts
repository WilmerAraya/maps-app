import { Map } from 'mapbox-gl';
import { MapState } from './MapProvider';
import { MapActions } from '../../constants';

type MapAction = { type: MapActions.SET_MAP; payload: Map };

export const MapReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case MapActions.SET_MAP:
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };
    default:
      return state;
  }
};
