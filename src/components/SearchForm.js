import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

const SearchForm = ({ onSearch }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    onSearch(data.breed);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
      <TextField
        label="Enter dog breed"
        variant="outlined"
        {...register('breed', { required: 'Breed is required' })}
        error={!!errors.breed}
        helperText={errors.breed ? errors.breed.message : ''}
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
