const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const xss = require('xss');
const User = require('../models/User');
const logger = require('../utils/logger');

const login = async (req, res) => {
  let { username, password } = req.body;

  // Sanitização dos dados de entrada
  username = xss(username);
  password = xss(password);

  const user = await User.findByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    logger.error(`Falha de autenticação para o usuário: ${username}`); // Registra o erro
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { login };
