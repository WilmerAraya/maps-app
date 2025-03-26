import { Box, InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ChangeEvent, useContext, useRef, useState, useEffect } from 'react';
import { PlacesContext } from '../context';
import { SearchResults } from '.';

export const SearchBar = () => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { searchQuery, searchPlacesByQuery } = useContext(PlacesContext);

  const [inputValue, setInputValue] = useState<string>(searchQuery);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInputValue(value);

    const trimmedValue = value.trim();

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      searchPlacesByQuery(trimmedValue);
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
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'),
        borderRadius: '10px',
        paddingTop: '8px',
        px: '8px',
      }}
    >
      <TextField
        id="search-places"
        value={inputValue}
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
