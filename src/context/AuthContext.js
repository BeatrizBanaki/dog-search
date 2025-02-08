import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials); // Endpoint de login
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`; // Adiciona o token nos cabeçalhos
    } catch (error) {
      console.error('Login falhou', error);
      throw new Error('Login falhou');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = ''; // Remove o token dos cabeçalhos
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser({}); // Aqui você pode definir um objeto de usuário real, se desejar
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
