const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { prisma } = require('../config/database');

const signAdminToken = (admin) =>
  jwt.sign({ adminId: admin.id, role: admin.role, email: admin.email }, env.jwt.secret, {
    expiresIn: env.jwt.expire
  });

const loginAdmin = async (email, password) => {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin || !admin.isActive) {
    return null;
  }
  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    return null;
  }
  await prisma.admin.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() }
  });
  const token = signAdminToken(admin);
  return { token, admin };
};

module.exports = { signAdminToken, loginAdmin };
