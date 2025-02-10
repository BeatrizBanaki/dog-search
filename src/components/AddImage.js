import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Autocomplete } from '@mui/material';
import api from '../services/api';

const AddImage = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Carrega a lista de raças ao montar o componente
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await api.get('/breeds');
        setBreeds(response.data);
      } catch (error) {
        console.error('Erro ao buscar raças:', error);
      }
    };

    fetchBreeds();
  }, []);

  // Função para enviar os dados à API
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedBreed || !imageUrl) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      await api.post('/images', { breedId: selectedBreed.id, imageUrl });
      setSuccessMessage('Imagem cadastrada com sucesso!');
      setError(null);
      setImageUrl('');
      setSelectedBreed(null);
    } catch (error) {
      setError('Erro ao cadastrar imagem.');
    }
  };

  return (
    <Grid container direction="column" spacing={2} style={{ maxWidth: 500, margin: 'auto', marginTop: 20 }}>
      <Grid item>
        <Typography variant="h5">Adicionar Imagem de Raça</Typography>
      </Grid>

      <Grid item>
        <Autocomplete
          options={breeds}
          getOptionLabel={(option) => option.name}
          value={selectedBreed}
          onChange={(event, newValue) => setSelectedBreed(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Selecione a Raça" variant="outlined" fullWidth />
          )}
        />
      </Grid>

      <Grid item>
        <TextField
          label="URL da Imagem"
          variant="outlined"
          fullWidth
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </Grid>

      {error && (
        <Grid item>
          <Typography color="error">{error}</Typography>
        </Grid>
      )}

      {successMessage && (
        <Grid item>
          <Typography color="primary">{successMessage}</Typography>
        </Grid>
      )}

      <Grid item>
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Adicionar Imagem
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddImage;
