const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const { rbac, ROLES } = require('../middleware/rbac');
const {
  createStore,
  listStores,
  getStore,
  updateStore,
  deleteStore,
  getSettings,
  updateSettings,
  storeAnalytics
} = require('../controllers/storeController');
const { withValidation } = require('../middleware/validation');

const router = express.Router();

router.post(
  '/',
  auth,
  rbac([ROLES.MERCHANT, ROLES.ADMIN]),
  withValidation([body('name').notEmpty(), body('subdomain').notEmpty()]),
  createStore
);
router.get('/', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), listStores);
router.get('/:id', auth, getStore);
router.put('/:id', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateStore);
router.delete('/:id', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), deleteStore);
router.get('/:id/analytics', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), storeAnalytics);
router.get('/:id/settings', auth, getSettings);
router.put('/:id/settings', auth, updateSettings);

module.exports = router;
