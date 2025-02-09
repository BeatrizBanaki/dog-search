import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#4CAF50', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
              Dog Search
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Button component={Link} to="/" sx={{ textTransform: 'none', color: 'white' }}>
              Home
            </Button>
            {user && (
              <Button component={Link} to="/breeds" sx={{ textTransform: 'none', color: 'white' }}>
                All Breeds
              </Button>
            )}
            {user && (
              <Button component={Link} to="/add-breed"  sx={{ textTransform: 'none', color: 'white' }} >
                Add Breed
              </Button>
            )}
            {user && (
              <Button component={Link} to="/gallery"  sx={{ textTransform: 'none', color: 'white' }} >
                Dog Gallery
              </Button>
            )}
            {!user && (
              <Button component={Link} to="/login" sx={{ textTransform: 'none', color: 'white' }}>
                Login
              </Button>
            )}
            {user && (
              <Button onClick={handleLogout} sx={{ textTransform: 'none', color: 'white' }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Conteúdo da Página */}
      <Container sx={{ flexGrow: 1, padding: '2rem' }}>{children}</Container>

      {/* Footer */}
      <footer style={{ backgroundColor: '#4CAF50', color: 'white', padding: '1rem 0', textAlign: 'center' }}>
        <Typography variant="body2">
          © 2025 Dog Search | Desenvolvido por{' '}
          <a href="https://github.com/BeatrizBanaki" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
            Beatriz Banaki
          </a>{' '}
          e{' '}
          <a href="https://github.com/Rafael-Francisco21" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
            Rafael Francisco
          </a>
        </Typography>
      </footer>
    </Box>
  );
};

export default Layout;
