const db = require('../config/db');

class Breed {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM breeds');
    return rows;
  }

  static async findByName(name) {
    const [rows] = await db.query('SELECT * FROM breeds WHERE name = ?', [name]);
    return rows[0];
  }

  static async createBreed(name, description) {
    await db.query('INSERT INTO breeds (name, description) VALUES (?, ?)', [name, description]);
  }
}

module.exports = Breed;