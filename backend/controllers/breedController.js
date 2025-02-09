const logger = require('../utils/logger');

const getBreeds = async (req, res) => {
  try {
    const breeds = await Breed.findAll();
    res.json(breeds);
  } catch (error) {
    logger.error(`Erro ao buscar raças: ${error.message}`); // Registra o erro
    res.status(500).json({ message: 'Erro ao buscar raças.' });
  }
};