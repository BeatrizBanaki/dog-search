import React from 'react';
import { Card, CardMedia } from '@mui/material';

const DogCard = ({ image }) => (
  <Card style={{ maxWidth: 300, margin: '1rem' }}>
    <CardMedia component="img" height="200" image={image} alt="Dog" />
  </Card>
);

export default DogCard;
