const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');
const env = require('../config/env');
const { sendWelcomeEmail, sendPasswordResetEmail, sendVerificationEmail } = require('../services/emailService');
const { ROLES } = require('../config/constants');

const signToken = (user) =>
  jwt.sign({ id: user.id, role: user.role, email: user.email }, env.jwt.secret, {
    expiresIn: env.jwt.expire
  });

const register = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, fullName, role: ROLES.MERCHANT }
    });
    await sendWelcomeEmail(email, fullName || 'Merchant');
    const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = signToken(user);
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  res.json({ message: 'Logged out' });
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(200).json({ message: 'If account exists, email sent' });
    const token = signToken(user);
    await sendPasswordResetEmail(email, token);
    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, env.jwt.secret);
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashed }
    });
    res.json({ message: 'Password updated' });
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, env.jwt.secret);
    await prisma.user.update({
      where: { id: decoded.id },
      data: { emailVerified: true }
    });
    res.json({ message: 'Email verified' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail
};
