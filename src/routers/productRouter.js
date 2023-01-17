const express = require('express');
const { productController } = require('../controllers');
const validateProductName = require('../middlewares/validateProductName');

const router = express.Router();

router.get('/', productController.allProducts);

router.get('/:id', productController.getProduct);

router.post('/', validateProductName, productController.createProduct);

module.exports = router;