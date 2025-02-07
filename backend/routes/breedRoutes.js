const express = require('express');
const Breed = require('../models/Breed');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticação
const router = express.Router();
const Joi = require('joi');

// Buscar todas as raças (GET /api/breeds)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const breeds = await Breed.findAll();
    res.json(breeds);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar raças.' });
  }
});

// Inserir uma nova raça (POST /api/breeds)
router.post('/', authMiddleware, async (req, res) => {
  const { name, description } = req.body;

  // Validação de campos
  if (!name || !description) {
    return res.status(400).json({ message: 'Nome e descrição são obrigatórios.' });
  }

  try {
    await Breed.createBreed(name, description);
    res.status(201).json({ message: 'Raça cadastrada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar raça.' });
  }
});

// Esquema de validação para a raça
const breedSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'O nome da raça é obrigatório.',
      'any.required': 'O nome da raça é obrigatório.',
    }),
    description: Joi.string().required().messages({
      'string.empty': 'A descrição da raça é obrigatória.',
      'any.required': 'A descrição da raça é obrigatória.',
    }),
  });
  
  // Inserir uma nova raça (POST /api/breeds)
  router.post('/', authMiddleware, async (req, res) => {
    const { error } = breedSchema.validate(req.body, { abortEarly: false });
  
    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({ messages });
    }
  
    const { name, description } = req.body;
  
    try {
      await Breed.createBreed(name, description);
      res.status(201).json({ message: 'Raça cadastrada com sucesso.' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cadastrar raça.' });
    }
  });


module.exports = router;


