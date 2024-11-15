import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import SearchForm from './components/SearchForm';
import DogList from './components/DogList';
import BreedsList from './components/BreedsList';
import RandomDogImage from './components/RandomDogImage'; // Nova importação
import { fetchDogs } from './api';

const App = () => {
  const [images, setImages] = useState([]);

  const handleSearch = async (breed) => {
    const result = await fetchDogs(breed);
    setImages(result);
  };

  return (
    <Router>
      <Container style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>Dog Breed Search</Typography>
        <Button component={Link} to="/" variant="contained" color="primary" style={{ marginRight: '1rem' }}>
          Home
        </Button>
        <Button component={Link} to="/breeds" variant="contained" color="secondary" style={{ marginRight: '1rem' }}>
          All Breeds
        </Button>
        <Button component={Link} to="/random" variant="contained" color="success">
          Random Dog Image
        </Button>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchForm onSearch={handleSearch} />
                <DogList images={images} />
              </>
            }
          />
          <Route path="/breeds" element={<BreedsList />} />
          <Route path="/random" element={<RandomDogImage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;