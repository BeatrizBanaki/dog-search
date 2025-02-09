const logger = require('../utils/logger');

const createImage = async (req, res) => {
  const { breedId, imageUrl } = req.body;

  if (!breedId || !imageUrl) {
    logger.error('Campos obrigatórios não fornecidos.'); // Registra o erro
    return res.status(400).json({ message: 'ID da raça e URL da imagem são obrigatórios.' });
  }

  try {
    await DogImage.createImage(breedId, imageUrl);
    res.status(201).json({ message: 'Imagem cadastrada com sucesso.' });
  } catch (error) {
    logger.error(`Erro ao cadastrar imagem: ${error.message}`); // Registra o erro
    res.status(500).json({ message: 'Erro ao cadastrar imagem.' });
  }
};