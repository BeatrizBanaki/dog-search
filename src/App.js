import React from 'react';
import { Container, Typography, Alert } from '@mui/material';
import SearchForm from './components/SearchForm';
import DogList from './components/DogList';
import { DogProvider, useDogContext } from './context/DogContext';

const App = () => {
  return (
    <DogProvider>
      <Container style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>Dog Breed Search</Typography>
        <DogContent />
      </Container>
    </DogProvider>
  );
};

const DogContent = () => {
  const { images, errorMessage, fetchImages } = useDogContext();

  return (
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>} {/* Exibir mensagens de erro */}
      <SearchForm onSearch={fetchImages} />
      <DogList images={images} />
    </>
  );
};

export default App;
