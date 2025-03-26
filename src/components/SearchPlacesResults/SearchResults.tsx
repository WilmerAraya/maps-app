import { useContext, useState } from 'react';
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
import { MapContext, PlacesContext } from '../../context';
import { Feature } from '../../interfaces/places';

export const SearchResults = () => {
  const { places, searchQuery, isSearchingPlaces } = useContext(PlacesContext);
  const { map } = useContext(MapContext);

  const [activeId, setActiveId] = useState('');

  const onClickPlace = (place: Feature) => {
    setActiveId(place.id);
    const { longitude, latitude } = place.properties.coordinates;
    map?.flyTo({ center: [longitude, latitude], zoom: 14, essential: true });
  };

  if (isSearchingPlaces) {
    return <LoadingPlaces />;
  }

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
          <PlaceListItem onClick={() => onClickPlace(place)} isActive={place.id === activeId}>
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
