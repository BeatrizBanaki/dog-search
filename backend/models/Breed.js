const db = require('../config/db');

class Breed {
  // Buscar todas as raças
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM breeds');
    return rows;
  }

  // Inserir uma nova raça
  static async createBreed(name, description) {
    await db.query('INSERT INTO breeds (name, description) VALUES (?, ?)', [name, description]);
  }

  // Inserir uma imagem relacionada a uma raça
  static async addImageToBreed(breedId, imageUrl) {
    await db.query('INSERT INTO dog_images (breed_id, image_url) VALUES (?, ?)', [breedId, imageUrl]);
  }
}

module.exports = Breed;