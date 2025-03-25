import { PlacesActions } from '../../constants';
import { Feature } from '../../interfaces/places';
import { PlacesState } from './PlacesProvider';

type PlacesAction =
  | {
      type: PlacesActions.SET_USER_LOCATION;
      payload: [number, number];
    }
  | {
      type: PlacesActions.SET_SEARCHING_PLACES;
    }
  | {
      type: PlacesActions.SET_PLACES;
      payload: Feature[];
    };

export const placesReducer = (state: PlacesState, action: PlacesAction): PlacesState => {
  switch (action.type) {
    case PlacesActions.SET_USER_LOCATION:
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };

    case PlacesActions.SET_SEARCHING_PLACES:
      return {
        ...state,
        isSearchingPlaces: true,
      };

    case PlacesActions.SET_PLACES:
      return {
        ...state,
        isSearchingPlaces: false,
        places: action.payload,
      };

    default:
      return state;
  }
};
