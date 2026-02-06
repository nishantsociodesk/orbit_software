const express = require('express');
const {
  getStoreBySubdomain,
  getStoreProducts,
  getStoreCustomization
} = require('../controllers/publicController');

const router = express.Router();

// Public routes (no auth required)
router.get('/stores/:subdomain', getStoreBySubdomain);
router.get('/stores/:subdomain/products', getStoreProducts);
router.get('/stores/:subdomain/customization', getStoreCustomization);

module.exports = router;
