import React from 'react';
import DogCard from './DogCard';
import { Grid } from '@mui/material';

const DogList = ({ images }) => (
  <Grid container spacing={2}>
    {images.map((image, index) => (
      <Grid item key={index} xs={12} sm={6} md={4}>
        <DogCard image={image} />
      </Grid>
    ))}
  </Grid>
);

export default DogList;
