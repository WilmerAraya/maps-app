export interface PlacesSatate {
  isLoading: boolean;
  userLocation?: [number, number]; // optional
}

const INITIAL_STATE: PlacesSatate = {
  isLoading: false,
  userLocation: undefined,
};

export const PlacesProvider = () => {
  return <div></div>;
};
