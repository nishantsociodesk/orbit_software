const express = require('express');
const auth = require('../middleware/auth');
const { rbac, ROLES } = require('../middleware/rbac');
const {
  getCustomization,
  updateCustomization
} = require('../controllers/websiteCustomizationController');

const router = express.Router();

router.get('/', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), getCustomization);
router.put('/', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateCustomization);
router.get('/:storeId', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), getCustomization);
router.put('/:storeId', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateCustomization);

module.exports = router;
