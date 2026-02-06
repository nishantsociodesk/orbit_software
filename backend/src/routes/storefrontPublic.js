const express = require('express');
const {
  getStoreInfo,
  getStoreCustomization,
  getStoreProducts,
  getStoreProduct,
  getStoreCategories,
  getStoreTheme
} = require('../controllers/storefrontPublicController');

const router = express.Router();

/**
 * Public Storefront API Routes
 * No authentication required - these are public-facing endpoints
 * Used by merchant websites to fetch their store data dynamically
 */

// Store information
router.get('/:subdomain/info', getStoreInfo);

// Website customization (branding, colors, hero section, etc.)
router.get('/:subdomain/customization', getStoreCustomization);

// Products
router.get('/:subdomain/products', getStoreProducts);
router.get('/:subdomain/products/:productId', getStoreProduct);

// Categories
router.get('/:subdomain/categories', getStoreCategories);

// Theme configuration
router.get('/:subdomain/theme', getStoreTheme);

module.exports = router;
