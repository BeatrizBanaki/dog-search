const express = require('express');
const DogImage = require('../models/DogImage');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticação
const router = express.Router();
const Joi = require('joi');

// Buscar imagens de uma raça (GET /api/images/:breedId)
router.get('/:breedId', authMiddleware, async (req, res) => {
  const { breedId } = req.params;

  try {
    const images = await DogImage.findByBreedId(breedId);
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar imagens.' });
  }
});

// Inserir uma nova imagem (POST /api/images)
router.post('/', authMiddleware, async (req, res) => {
  const { breedId, imageUrl } = req.body;

  // Validação de campos
  if (!breedId || !imageUrl) {
    return res.status(400).json({ message: 'ID da raça e URL da imagem são obrigatórios.' });
  }

  try {
    await DogImage.createImage(breedId, imageUrl);
    res.status(201).json({ message: 'Imagem cadastrada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar imagem.' });
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
  const { error } = imageSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return res.status(400).json({ messages });
  }

  const { breedId, imageUrl } = req.body;

  try {
    await DogImage.createImage(breedId, imageUrl);
    res.status(201).json({ message: 'Imagem cadastrada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar imagem.' });
  }
});

module.exports = router;