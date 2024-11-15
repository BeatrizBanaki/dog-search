import React, { useEffect, useState } from 'react';
import { fetchAllBreeds } from '../api';
import { List, ListItem, ListItemText, Typography, Container } from '@mui/material';

const BreedsList = () => {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const loadBreeds = async () => {
      const breedsList = await fetchAllBreeds();
      setBreeds(breedsList);
    };

    loadBreeds();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dog Breeds</Typography>
      <List>
        {breeds.map((breed, index) => (
          <ListItem key={index}>
            <ListItemText primary={breed} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BreedsList;
