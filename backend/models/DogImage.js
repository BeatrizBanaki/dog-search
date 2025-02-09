const db = require('../config/db');

class DogImage {
  // Buscar todas as imagens de uma raça
  static async findByBreedId(breedId) {
    const [rows] = await db.query('SELECT * FROM dog_images WHERE breed_id = ?', [breedId]);
    return rows;
  }

  // Inserir uma nova imagem
  static async createImage(breedId, imageUrl) {
    await db.query('INSERT INTO dog_images (breed_id, image_url) VALUES (?, ?)', [breedId, imageUrl]);
  }
}

module.exports = DogImage;