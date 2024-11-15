import React, { useState } from 'react';
import { Grid, Card, CardMedia, Typography, Dialog, DialogContent } from '@mui/material';
import { useDogContext } from '../context/DogContext';

const DogList = () => {
  const { images } = useDogContext(); 
  const [selectedImage, setSelectedImage] = useState(null); // Para armazenar a imagem clicada
  const [isDialogOpen, setIsDialogOpen] = useState(false);  // Controle do Dialog

  const handleOpenDialog = (image) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
    setIsDialogOpen(false);
  };

  return (
    <>
      {/* Grid com as imagens */}
      <Grid container spacing={2} justifyContent="center">
        {images.map((image, index) => (
          <Grid item key={index}>
            <Card style={{ width: 200, cursor: 'pointer' }} onClick={() => handleOpenDialog(image)}>
              <CardMedia component="img" height="140" image={image} alt={`Dog #${index + 1}`} />
              {/* <Typography variant="caption" align="center">Dog #{index + 1}</Typography> */}
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Popup para exibir a imagem maior */}
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
    </>
  );
};

export default DogList;
