import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { useDogContext } from '../context/DogContext';

const SearchForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { fetchImages } = useDogContext(); 

  const onSubmit = async (data) => {
    fetchImages(data.breed); 
  };

  return (
    <Grid container direction="column" spacing={2} style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
      <Grid item>
        <Typography variant="h6">Search for Dog Breed</Typography>
      </Grid>
      
      <Grid item>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Breed"
            variant="outlined"
            fullWidth
            {...register('breed', { required: 'Breed is required' })}
            error={!!errors.breed}
            helperText={errors.breed ? errors.breed.message : ''}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
            Search
          </Button>
        </form>
      </Grid>

      {errors.breed && (
        <Grid item>
          <Typography color="error">{errors.breed.message}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default SearchForm;
