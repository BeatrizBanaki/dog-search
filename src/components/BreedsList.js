import React, { useEffect, useState } from 'react';
import { fetchAllBreeds } from '../api';
import { List, ListItem, ListItemText, Typography, Container } from '@mui/material';
import { useDogContext } from '../context/DogContext';
import { useNavigate } from 'react-router-dom';

const BreedsList = () => {
  const [breeds, setBreeds] = useState([]);
  const { fetchImages } = useDogContext(); // Hook para acessar o contexto
  const navigate = useNavigate(); // Hook para redirecionamento

  useEffect(() => {
    const loadBreeds = async () => {
      const breedsList = await fetchAllBreeds();
      setBreeds(breedsList);
    };

    loadBreeds();
  }, []);

  const handleBreedClick = async (breed) => {
    await fetchImages(breed); // Realiza a busca com o nome da raça
    navigate('/'); // Redireciona para a página inicial
  };

  return (
    <Container style={{ marginTop: '1rem' }}>
      <Typography variant="h4" gutterBottom>Dog Breeds</Typography>
      <List>
        {breeds.map((breed, index) => (
          <ListItem 
            key={index} 
            button 
            onClick={() => handleBreedClick(breed)} // Adiciona comportamento de clique
          >
            <ListItemText primary={breed} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BreedsList;
