import { Box, useMediaQuery, useTheme } from '@mui/material';
import { BtnMyLocation, MapView, SearchBar } from '../components';

export const HomeScreen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <MapView />

      <Box
        sx={{
          position: 'absolute',
          top: isMobile ? '10px' : '20px',
          left: isMobile ? '10px' : '20px',
          width: isMobile ? 'calc(100% - 20px)' : '400px',
          maxWidth: '100%',
          zIndex: 999,
        }}
      >
        <SearchBar />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: isMobile ? '80px' : '20px',
          right: isMobile ? '10px' : '20px',
          zIndex: 999,
        }}
      >
        <BtnMyLocation />
      </Box>
    </Box>
  );
};
