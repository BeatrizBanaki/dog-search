import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import SearchForm from './components/SearchForm';
import DogList from './components/DogList';
import { fetchDogs } from './api';

const App = () => {
  const [images, setImages] = useState([]);

  const handleSearch = async (breed) => {
    const result = await fetchDogs(breed);
    setImages(result);
  };

  return (
    <Container style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Dog Breed Search
      </Typography>
      <SearchForm onSearch={handleSearch} />
      <DogList images={images} />
    </Container>
  );
};

export default App;
