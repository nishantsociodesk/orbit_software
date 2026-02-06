const express = require('express');
const auth = require('../middleware/auth');
const { rbac, ROLES } = require('../middleware/rbac');
const {
  createProduct,
  listProducts,
  listByStore,
  getProduct,
  updateProduct,
  deleteProduct,
  addVariant,
  updateVariant,
  deleteVariant
} = require('../controllers/productController');

const router = express.Router();

// List products for current user's store
router.get('/', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), listProducts);

// Create product
router.post('/', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), createProduct);

// Get products by store ID
router.get('/store/:storeId', auth, listByStore);

// Get, update, delete specific product
router.get('/:id', auth, getProduct);
router.put('/:id', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateProduct);
router.delete('/:id', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), deleteProduct);

// Variants
router.post('/:id/variants', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), addVariant);
router.put('/variants/:variantId', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateVariant);
router.delete('/variants/:variantId', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), deleteVariant);

module.exports = router;
