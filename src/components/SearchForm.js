import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, Typography, Autocomplete, TextField } from '@mui/material';
import { useDogContext } from '../context/DogContext';
import { fetchAllBreeds } from '../api';

const SearchForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { fetchImages } = useDogContext(); // Função de busca no contexto
  const [breeds, setBreeds] = useState([]); // Lista de raças

  useEffect(() => {
    const loadBreeds = async () => {
      const breedsList = await fetchAllBreeds();
      setBreeds(breedsList);
    };

    loadBreeds();
  }, []);

  const onSubmit = async (data) => {
    fetchImages(data.breed); // Busca a raça selecionada
  };

  return (
    <Grid container direction="column" spacing={2} style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
      <Grid item>
        <Typography variant="h6">Search for Dog Breed</Typography>
      </Grid>
      
      <Grid item>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Autocomplete
            options={breeds} // Opções para preenchimento automático
            freeSolo
            onInputChange={(event, value) => setValue('breed', value)} // Atualiza o valor no formulário
            renderInput={(params) => (
              <TextField
                {...params}
                label="Breed"
                variant="outlined"
                fullWidth
                {...register('breed', { required: 'Breed is required' })}
                error={!!errors.breed}
                helperText={errors.breed ? errors.breed.message : ''}
              />
            )}
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
