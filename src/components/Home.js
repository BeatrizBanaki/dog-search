import React from 'react';
import { Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <Container
      sx={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
        Welcome to Dog Search
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Find dog breeds, images, and more. Explore the options above.
      </Typography>
    </Container>
  );
};

export default Home;
