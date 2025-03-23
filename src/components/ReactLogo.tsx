import { Box } from '@mui/material';

import reactLogo from '../assets/react.svg';

export const ReactLogo = () => {
  return (
    <Box
      component="img"
      sx={{
        position: 'fixed',
        right: '40px',
        bottom: '40px',
        width: '60px',
      }}
      src={reactLogo}
      alt="React Logo"
    />
  );
};
