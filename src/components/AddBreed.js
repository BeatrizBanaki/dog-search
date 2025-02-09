import React, { useState } from 'react';
import api from '../services/api';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const AddBreed = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset mensagens
    setMessage(null);
    setError(null);

    if (!name || !description) {
      setError('Nome e descrição são obrigatórios.');
      return;
    }

    try {
      const response = await api.post('/breeds', { name, description });

      setMessage(response.data.message);
      setName('');
      setDescription('');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao conectar com o servidor.');
    }
  };

  return (
    <Container
      sx={{
        padding: '2rem',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
        Adicionar Nova Raça
      </Typography>

      {error && <Alert severity="error" sx={{ marginBottom: '1rem' }}>{error}</Alert>}
      {message && <Alert severity="success" sx={{ marginBottom: '1rem' }}>{message}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label="Nome da Raça"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Descrição"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45A049' } }}>
          Adicionar Raça
        </Button>
      </Box>
    </Container>
  );
};

export default AddBreed;
