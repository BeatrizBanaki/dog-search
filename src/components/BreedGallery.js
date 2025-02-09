import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, Dialog, DialogContent, Autocomplete, TextField, Button, Typography, Container } from '@mui/material';
import api from '../services/api';

const BreedGallery = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        const response = await api.get('/breeds');
        setBreeds(response.data);
      } catch (error) {
        console.error('Erro ao buscar raças:', error);
      }
    };
    loadBreeds();
  }, []);

  const fetchImages = async (breedId) => {
    try {
      const response = await api.get(`/images/${breedId}`);
      setImages(response.data);
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
      setImages([]);
    }
  };

  const handleSearch = () => {
    if (selectedBreed) {
      fetchImages(selectedBreed.id);
    }
  };

  const handleOpenDialog = (image) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
    setIsDialogOpen(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Galeria de Raças de Cachorros
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={breeds}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => setSelectedBreed(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Selecione uma raça" variant="outlined" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleSearch}
            disabled={!selectedBreed}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center">
        {images.length > 0 ? (
          images.map((image) => (
            <Grid item key={image.id}>
              <Card style={{ width: 200, cursor: 'pointer' }} onClick={() => handleOpenDialog(image.image_url)}>
                <CardMedia component="img" height="140" image={image.image_url} alt="Dog" />
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {selectedBreed ? 'Nenhuma imagem encontrada para esta raça.' : 'Escolha uma raça para ver as imagens.'}
          </Typography>
        )}
      </Grid>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="md">
        <DialogContent>
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Selected Dog" 
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default BreedGallery;
