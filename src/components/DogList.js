import React from 'react';
import { Grid, Card, CardMedia, Typography } from '@mui/material';
import { useDogContext } from '../context/DogContext';

const DogList = () => {
  const { images } = useDogContext(); 

  return (
    <Grid container spacing={2} justifyContent="center">
      {images.map((image, index) => (
        <Grid item key={index}>
          <Card style={{ width: 200 }}>
            <CardMedia component="img" height="140" image={image} alt="Dog" />
            <Typography variant="caption" align="center">Dog #{index + 1}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DogList;
