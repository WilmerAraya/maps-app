import { PlacesActions } from '../../constants';
import { PlacesState } from './PlacesProvider';

type PlacesAction = {
  type: PlacesActions.SET_USER_LOCATION;
  payload: [number, number];
};

export const placesReducer = (
  state: PlacesState,
  action: PlacesAction
): PlacesState => {
  switch (action.type) {
    case PlacesActions.SET_USER_LOCATION:
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };
    default:
      return state;
  }
};
