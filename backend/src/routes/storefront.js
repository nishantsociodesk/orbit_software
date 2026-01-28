const express = require('express');
const {
  getStoreBySubdomain,
  getProducts,
  getProduct,
  checkout,
  getLayout
} = require('../controllers/storefrontController');

const router = express.Router();

router.get('/:subdomain', getStoreBySubdomain);
router.get('/:subdomain/products', getProducts);
router.get('/:subdomain/products/:id', getProduct);
router.post('/:subdomain/checkout', checkout);
router.get('/:subdomain/layout', getLayout);

module.exports = router;
