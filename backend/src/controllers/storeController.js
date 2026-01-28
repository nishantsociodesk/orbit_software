const { prisma } = require('../config/database');
const { getStoreAnalytics } = require('../services/analyticsService');

const createStore = async (req, res, next) => {
  try {
    const { name, subdomain, customDomain, description, logo } = req.body;
    const store = await prisma.store.create({
      data: {
        name,
        subdomain,
        customDomain,
        description,
        logo,
        userId: req.user.id
      }
    });
    res.status(201).json({ store });
  } catch (err) {
    next(err);
  }
};

const listStores = async (req, res, next) => {
  try {
    const stores = await prisma.store.findMany({ where: { userId: req.user.id } });
    res.json({ stores });
  } catch (err) {
    next(err);
  }
};

const getStore = async (req, res, next) => {
  try {
    const store = await prisma.store.findUnique({ where: { id: req.params.id } });
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.json({ store });
  } catch (err) {
    next(err);
  }
};

const updateStore = async (req, res, next) => {
  try {
    const { name, description, logo, customDomain, isActive } = req.body;
    const store = await prisma.store.update({
      where: { id: req.params.id },
      data: { name, description, logo, customDomain, isActive }
    });
    res.json({ store });
  } catch (err) {
    next(err);
  }
};

const deleteStore = async (req, res, next) => {
  try {
    await prisma.store.update({
      where: { id: req.params.id },
      data: { isActive: false }
    });
    res.json({ message: 'Store disabled' });
  } catch (err) {
    next(err);
  }
};

const getSettings = async (req, res, next) => {
  try {
    const settings = await prisma.storeSettings.findUnique({
      where: { storeId: req.params.id }
    });
    res.json({ settings });
  } catch (err) {
    next(err);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const data = req.body;
    const settings = await prisma.storeSettings.upsert({
      where: { storeId: req.params.id },
      update: data,
      create: { ...data, storeId: req.params.id }
    });
    res.json({ settings });
  } catch (err) {
    next(err);
  }
};

const storeAnalytics = async (req, res, next) => {
  try {
    const metrics = await getStoreAnalytics(req.params.id);
    res.json({ metrics });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createStore,
  listStores,
  getStore,
  updateStore,
  deleteStore,
  getSettings,
  updateSettings,
  storeAnalytics
};
