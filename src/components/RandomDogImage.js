import React, { useEffect, useState } from 'react';
import { fetchRandomDogImage } from '../api';
import { Button, Container, Typography, CircularProgress } from '@mui/material';

const RandomDogImage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadRandomImage = async () => {
    setLoading(true);
    const randomImage = await fetchRandomDogImage();
    setImage(randomImage);
    setLoading(false);
  };

  useEffect(() => {
    loadRandomImage();
  }, []);

  return (
    <Container style={{ textAlign: 'center', paddingTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>Random Dog Image</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <img src={image} alt="Random Dog" style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem' }} />
      )}
      <Button variant="contained" color="primary" onClick={loadRandomImage} style={{ marginTop: '1rem' }}>
        Show Another Image
      </Button>
    </Container>
  );
};

export default RandomDogImage;
