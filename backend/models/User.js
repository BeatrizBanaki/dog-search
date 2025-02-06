const db = require('../config/db');

class User {
  static async findByUsername(username) {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  static async createUser(username, password) {
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
  }
}

module.exports = User;