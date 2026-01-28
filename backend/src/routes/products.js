const express = require('express');
const auth = require('../middleware/auth');
const { rbac, ROLES } = require('../middleware/rbac');
const {
  createProduct,
  listByStore,
  getProduct,
  updateProduct,
  deleteProduct,
  addVariant,
  updateVariant,
  deleteVariant
} = require('../controllers/productController');

const router = express.Router();

router.post('/', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), createProduct);
router.get('/store/:storeId', auth, listByStore);
router.get('/:id', auth, getProduct);
router.put('/:id', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateProduct);
router.delete('/:id', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), deleteProduct);
router.post('/:id/variants', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), addVariant);
router.put('/variants/:variantId', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateVariant);
router.delete('/variants/:variantId', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), deleteVariant);

module.exports = router;
