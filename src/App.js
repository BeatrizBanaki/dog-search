import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Typography, Button, Alert } from '@mui/material';
import SearchForm from './components/SearchForm';
import DogList from './components/DogList';
import BreedsList from './components/BreedsList';
import RandomDogImage from './components/RandomDogImage';
import { DogProvider, useDogContext } from './context/DogContext';

const App = () => {
  return (
    <DogProvider>
      <Router>
        <Container style={{ padding: '2rem' }}>
          <Typography variant="h4" gutterBottom>
            Dog Breed Search
          </Typography>
          <nav style={{ marginBottom: '1rem' }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              style={{ marginRight: '1rem' }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/breeds"
              variant="contained"
              color="secondary"
              style={{ marginRight: '1rem' }}
            >
              All Breeds
            </Button>
            <Button
              component={Link}
              to="/random"
              variant="contained"
              color="success"
            >
              Random Dog Image
            </Button>
          </nav>

          <Routes>
            <Route path="/" element={<DogContent />} />
            <Route path="/breeds" element={<BreedsList />} />
            <Route path="/random" element={<RandomDogImage />} />
          </Routes>
        </Container>
      </Router>
    </DogProvider>
  );
};

const DogContent = () => {
  const { images, errorMessage, fetchImages } = useDogContext();

  return (
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <SearchForm onSearch={fetchImages} />
      <DogList images={images} />
    </>
  );
};

export default App;
