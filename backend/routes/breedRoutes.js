const express = require('express');
const Breed = require('../models/Breed');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticação
const router = express.Router();
const Joi = require('joi');
const logger = require('../utils/logger');

// Buscar todas as raças (GET /api/breeds)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const breeds = await Breed.findAll();
    res.json(breeds);
  } catch (error) {
    logger.error(`Erro ao buscar raças: ${error.message}`);
    res.status(500).json({ message: 'Erro ao buscar raças.' });
  }
});

// Inserir uma nova raça (POST /api/breeds)
router.post('/', authMiddleware, async (req, res) => {
  const { name, description } = req.body;

  // Validação de campos
  if (!name || !description) {
    logger.error('Campos obrigatórios não fornecidos.');
    return res.status(400).json({ message: 'Nome e descrição são obrigatórios.' });
  }

  try {
    await Breed.createBreed(name, description);
    res.status(201).json({ message: 'Raça cadastrada com sucesso.' });
  } catch (error) {
    logger.error(`Erro ao cadastrar raça: ${error.message}`);
    res.status(500).json({ message: 'Erro ao cadastrar raça.' });
  }
});

// Inserir uma imagem relacionada a uma raça (POST /api/breeds/:breedId/images)
router.post('/:breedId/images', authMiddleware, async (req, res) => {
  const { breedId } = req.params;
  const { imageUrl } = req.body;

  // Validação de campos
  if (!imageUrl) {
    logger.error('URL da imagem não fornecida.');
    return res.status(400).json({ message: 'URL da imagem é obrigatória.' });
  }

  try {
    await Breed.addImageToBreed(breedId, imageUrl);
    res.status(201).json({ message: 'Imagem cadastrada com sucesso.' });
  } catch (error) {
    logger.error(`Erro ao cadastrar imagem: ${error.message}`);
    res.status(500).json({ message: 'Erro ao cadastrar imagem.' });
  }
});


module.exports = router;


