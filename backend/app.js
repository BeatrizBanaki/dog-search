const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const breedRoutes = require('./routes/breedRoutes'); // Importe as rotas de raças
const imageRoutes = require('./routes/imageRoutes');
const logger = require('./logger'); // Importe o logger

app.use(cors());
app.use(bodyParser.json());

// Rotas públicas
app.use('/api/auth', authRoutes);

// Rotas protegidas (requerem autenticação)
app.use('/api/breeds', breedRoutes);
app.use('/api/images', imageRoutes);

// Middleware para registrar erros globais
app.use((err, req, res, next) => {
  logger.error(`Erro global: ${err.message}`);
  res.status(500).json({ message: 'Erro interno no servidor.' });
});

module.exports = app;