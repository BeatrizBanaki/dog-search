const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key'); // Verifica o token
    req.userId = decoded.id; // Adiciona o ID do usuário à requisição
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;