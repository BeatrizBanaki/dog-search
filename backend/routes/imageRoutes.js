const express = require('express');
const xss = require('xss');
const DogImage = require('../models/DogImage');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticação
const router = express.Router();
const Joi = require('joi');
const logger = require('../utils/logger');

// Buscar imagens de uma raça (GET /api/images/:breedId)
router.get('/:breedId', authMiddleware, async (req, res) => {
  let { breedId } = req.params;
  breedId = xss(breedId);

  try {
    const images = await DogImage.findByBreedId(breedId);
    res.json(images);
  } catch (error) {
    logger.error(`Erro ao buscar imagens: ${error.message}`);
    res.status(500).json({ message: 'Erro ao buscar imagens.' });
  }
});

// Esquema de validação para a imagem
const imageSchema = Joi.object({
  breedId: Joi.number().required().messages({
    'number.base': 'O ID da raça deve ser um número.',
    'any.required': 'O ID da raça é obrigatório.',
  }),
  imageUrl: Joi.string().uri().required().messages({
    'string.uri': 'A URL da imagem deve ser válida.',
    'string.empty': 'A URL da imagem é obrigatória.',
    'any.required': 'A URL da imagem é obrigatória.',
  }),
});

// Inserir uma nova imagem (POST /api/images)
router.post('/', authMiddleware, async (req, res) => {
  let { breedId, imageUrl } = req.body;

  // Sanitização dos dados
  breedId = xss(breedId);
  imageUrl = xss(imageUrl);

  const { error } = imageSchema.validate({ breedId, imageUrl }, { abortEarly: false });
  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return res.status(400).json({ messages });
  }

  try {
    await DogImage.createImage(breedId, imageUrl);
    res.status(201).json({ message: 'Imagem cadastrada com sucesso.' });
  } catch (error) {
    logger.error(`Erro ao cadastrar imagem: ${error.message}`);
    res.status(500).json({ message: 'Erro ao cadastrar imagem.' });
  }
});

module.exports = router;
