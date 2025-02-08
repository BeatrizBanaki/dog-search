const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const breedRoutes = require('./routes/breedRoutes'); // Importe as rotas de raças

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rotas públicas
app.use('/api/auth', authRoutes);

// Rotas protegidas (requerem autenticação)
app.use('/api/breeds', breedRoutes);

module.exports = app;