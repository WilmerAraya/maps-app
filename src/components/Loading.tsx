import { Box, CircularProgress, Typography } from '@mui/material';

export const Loading = () => {
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
