import { useContext } from 'react';
import { Divider, List, Typography } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';

import {
  AddressText,
  DirectionsButton,
  NoPlacesContainer,
  PlaceListItem,
  PlacesContainer,
} from './SearchResults.styles';
import { LoadingPlaces } from '..';
import { PlacesContext } from '../../context';

export const SearchResults = () => {
  const { places, searchQuery, isSearchingPlaces } = useContext(PlacesContext);

  if (isSearchingPlaces) {
    return <LoadingPlaces />;
  }

  console.log(searchQuery);

  if (places.length === 0 && searchQuery.length > 0) {
    return (
      <NoPlacesContainer>
        <Typography variant="h6" color="text.secondary">
          No places found
        </Typography>
      </NoPlacesContainer>
    );
  }

  return (
    <List>
      {places.map((place, index) => (
        <PlacesContainer key={place.id}>
          <PlaceListItem>
            <Typography variant="h6">{place.properties.name}</Typography>
            <AddressText>{place.properties.full_address}</AddressText>
            <DirectionsButton variant="contained" endIcon={<DirectionsIcon />}>
              Directions
            </DirectionsButton>
          </PlaceListItem>
          {index < places.length - 1 && <Divider component="li" variant="fullWidth" />}
        </PlacesContainer>
      ))}
    </List>
  );
};
