import { Box, Divider, List, ListItem, Skeleton } from '@mui/material';

export const LoadingPlaces = () => {
  return (
    <List>
      {Array.from(new Array(5)).map((_, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <Skeleton variant="text" width="60%" height={32} />
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="rounded" width={140} height={36} />
          </ListItem>
          {index < 4 && <Divider />}
        </Box>
      ))}
    </List>
  );
};
