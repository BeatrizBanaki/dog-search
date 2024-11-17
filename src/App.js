import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container } from '@mui/material';
import SearchForm from './components/SearchForm';
import DogList from './components/DogList';
import BreedsList from './components/BreedsList';
import RandomDogImage from './components/RandomDogImage';
import { DogProvider, useDogContext } from './context/DogContext';
import { Alert } from '@mui/material';


const App = () => {
  return (
    <DogProvider>
      <Router>
        {/* Header atualizado com logo */}
        <AppBar position="static" sx={{ backgroundColor: '#4CAF50', boxShadow: 'none' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Logo e Título */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={process.env.PUBLIC_URL + '/logo.png'}
                alt="Dog Logo"
                style={{
                  height: '40px',
                  width: '40px',
                  borderRadius: '50%',
                  marginRight: '1rem',
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                }}
              >
                Dog Search
              </Typography>
            </Box>

            {/* Botões de Navegação */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                height: '100%',
              }}
            >
              <Button
                component={Link}
                to="/"
                sx={{
                  textTransform: 'none',
                  color: 'white',
                  borderRadius: 0,
                  padding: '0.5rem 1rem',
                  '&:hover': {
                    backgroundColor: '#66BB6A',
                  },
                }}
              >
                Home
              </Button>
              <Box
                sx={{
                  width: '1px',
                  backgroundColor: 'white',
                  height: '40px',
                }}
              ></Box>
              <Button
                component={Link}
                to="/breeds"
                sx={{
                  textTransform: 'none',
                  color: 'white',
                  borderRadius: 0,
                  padding: '0.5rem 1rem',
                  '&:hover': {
                    backgroundColor: '#66BB6A',
                  },
                }}
              >
                All Breeds
              </Button>
              <Box
                sx={{
                  width: '1px',
                  backgroundColor: 'white',
                  height: '40px',
                }}
              ></Box>
              <Button
                component={Link}
                to="/random"
                sx={{
                  textTransform: 'none',
                  color: 'white',
                  borderRadius: 0,
                  padding: '0.5rem 1rem',
                  '&:hover': {
                    backgroundColor: '#66BB6A',
                  },
                }}
              >
                Random Dog Image
              </Button>
            </Box>
          </Toolbar>
        </AppBar>



        {/* Conteúdo Principal */}
        <Container
          sx={{
            padding: '2rem',
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Routes>
            <Route path="/" element={<DogContent />} />
            <Route path="/breeds" element={<BreedsList />} />
            <Route path="/random" element={<RandomDogImage />} />
          </Routes>


        </Container>
          {/* Footer */}
          <footer>
            <Box
            >
              <Typography variant="body2">
              © 2024 Dog Search | Desenvolvido por {' '}
                <a
                  href="https://github.com/BeatrizBanaki"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#4caf50', textDecoration: 'none' }}
                >
                  Beatriz Banaki
                </a>
                {' '} e {' '}
                <a
                  href="https://github.com/Rafael-Francisco21"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#4caf50', textDecoration: 'none' }}
                >
                  Rafael Francisco
                </a>
              </Typography>
            </Box>
          </footer>
      </Router>
    </DogProvider>
  );
};

const DogContent = () => {
  const { images, errorMessage, fetchImages } = useDogContext();

  return (
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {/* Adicione margem abaixo do SearchForm */}
      <Box sx={{ marginBottom: '2rem' }}>
        <SearchForm onSearch={fetchImages} />
      </Box>
      <DogList images={images} />
    </>
  );
};


export default App;
