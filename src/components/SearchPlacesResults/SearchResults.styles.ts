import { styled } from '@mui/material/styles';
import { Box, Button, ListItemButton } from '@mui/material';

export const NoPlacesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  margin: theme.spacing(2, 0),
}));

export const PlacesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const PlaceListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => {
  const activeBackgroundColor = theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[300];

  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
    backgroundColor: isActive ? activeBackgroundColor : 'transparent',
    borderRadius: theme.shape.borderRadius,
  };
});

export const AddressText = styled('p')(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.text.secondary,
  margin: 0,
}));

export const DirectionsButton = styled(Button)({
  textTransform: 'none',
});
