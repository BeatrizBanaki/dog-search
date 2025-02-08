import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Importa o contexto

const Home = () => {
  const { user } = useContext(AuthContext); // Usa o contexto para pegar o estado do usuário

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
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

            {/* Só renderiza o botão "All Breeds" se o usuário estiver logado */}
            {user && (
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
            )}

            <Button
              component={Link}
              to="/login"
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
              Login
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
          flexGrow: 1,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Welcome to Dog Search
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
          Find dog breeds, images, and more. Explore the options above.
        </Typography>
      </Container>

      {/* Footer */}
      <footer sx={{ backgroundColor: '#4CAF50', color: 'white', padding: '1rem 0' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            © 2025 Dog Search | Desenvolvido por {' '}
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
    </Box>
  );
};

export default Home;
