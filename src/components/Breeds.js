import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Breeds = () => {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      const response = await api.get('/breeds');
      setBreeds(response.data);
    };

    fetchBreeds();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Dog Breeds
      </Typography>
      <List>
        {breeds.map((breed) => (
          <ListItem key={breed.id}>
            <ListItemText primary={breed.name} secondary={breed.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Breeds;
