import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

export const Loading = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress color="primary" size={60} />
      <Typography variant="h5" sx={{ marginTop: 5 }}>
        Loading...
      </Typography>
    </Box>
  );
};
