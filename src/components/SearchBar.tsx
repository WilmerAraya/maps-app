import { Box, InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import { PlacesContext } from '../context';
import { SearchResults } from '.';

export const SearchBar = () => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [lastSearch, setLastSearch] = useState<string>('');
  const { searchPlacesByQuery } = useContext(PlacesContext);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim(); // Remove leading/trailing whitespace

    // Clear the previous timeout
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Validations
    const isValidSearch = (value: string): boolean => {
      if (value.toLowerCase() === lastSearch.toLowerCase()) return false; // Duplicate search check
      return true;
    };

    if (!isValidSearch(value)) return;

    // Set a new debounced timeout
    debounceRef.current = setTimeout(() => {
      setLastSearch(value); // Update the last searched value
      searchPlacesByQuery(value);
    }, 350);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 999,
        boxShadow: 8,
        width: '300px',
        // Fondo el color del fondo del tema de MUI, con algo de transparencia solo si es dark mode
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'),
        borderRadius: '10px',
        paddingTop: '8px',
        px: '8px',
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
          width: '100%',
          '& .MuiInputBase-root': {
            padding: '6px',
          },
        }}
        onChange={handleSearch}
      />

      <SearchResults />
    </Box>
  );
};
