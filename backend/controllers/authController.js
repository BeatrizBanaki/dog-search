const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { login };