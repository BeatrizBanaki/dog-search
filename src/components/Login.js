import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', credentials);

      const { token } = response.data;
      localStorage.setItem('token', token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      navigate('/'); // Redireciona após login bem-sucedido
      setUser(token);
    } catch (error) {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Usuário"
          fullWidth
          margin="normal"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <TextField
          name="password"
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Entrar
        </Button>
      </form>
    </Box>
  );
};

export default Login;
