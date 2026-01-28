const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signUserToken } = require('../middleware/metaAuth');

const sanitizeUser = (user) => ({
  id: user.id,
  email: user.email,
  metaAdAccounts: user.metaAdAccounts,
  metaTokenExpiresAt: user.metaTokenExpiresAt
});

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });
    const token = signUserToken(user);
    res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = signUserToken(user);
    res.json({ token, user: sanitizeUser(user) });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };
