import { Box, InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ChangeEvent, useRef, useState } from 'react';

export const SearchBar = () => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [lastSearch, setLastSearch] = useState<string>('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim(); // Remove leading/trailing whitespace

    // Clear the previous timeout
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Validations
    const isValidSearch = (value: string): boolean => {
      if (!value) return false; // Empty input check
      if (value.length < 2) return false; // Minimum length check
      if (value === lastSearch) return false; // Duplicate search check
      return true;
    };

    if (!isValidSearch(value)) return;

    // Set a new debounced timeout
    debounceRef.current = setTimeout(() => {
      setLastSearch(value); // Update the last searched value
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
        onChange={handleSearch}
      />
    </Box>
  );
};
