const { prisma } = require('../config/database');

const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const product = await prisma.product.create({ data });
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

const listByStore = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { storeId: req.params.storeId },
      include: { variants: true }
    });
    res.json({ products });
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { variants: true }
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const product = await prisma.product.update({ where: { id: req.params.id }, data });
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await prisma.product.update({
      where: { id: req.params.id },
      data: { isActive: false }
    });
    res.json({ message: 'Product disabled' });
  } catch (err) {
    next(err);
  }
};

const addVariant = async (req, res, next) => {
  try {
    const variant = await prisma.productVariant.create({
      data: { ...req.body, productId: req.params.id }
    });
    res.status(201).json({ variant });
  } catch (err) {
    next(err);
  }
};

const updateVariant = async (req, res, next) => {
  try {
    const variant = await prisma.productVariant.update({
      where: { id: req.params.variantId },
      data: req.body
    });
    res.json({ variant });
  } catch (err) {
    next(err);
  }
};

const deleteVariant = async (req, res, next) => {
  try {
    await prisma.productVariant.delete({ where: { id: req.params.variantId } });
    res.json({ message: 'Variant removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  listByStore,
  getProduct,
  updateProduct,
  deleteProduct,
  addVariant,
  updateVariant,
  deleteVariant
};
