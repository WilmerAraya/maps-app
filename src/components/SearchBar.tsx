import { Box, InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export const SearchBar = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 999,
        boxShadow: 8,
      }}
    >
      <TextField
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          },
        }}
        placeholder="Search for places"
        variant="standard"
        sx={{
          width: '300px',
          '& .MuiInputBase-root': {
            padding: '6px',
          },
        }}
      />
    </Box>
  );
};
