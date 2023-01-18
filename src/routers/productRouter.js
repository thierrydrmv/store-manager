const express = require('express');
const { productController } = require('../controllers');
const validateProductName = require('../middlewares/validateProductName');
const validateEditProduct = require('../middlewares/validateEditProduct');

const router = express.Router();

router.get('/', productController.allProducts);

router.get('/:id', productController.getProduct);

router.post('/', validateProductName, productController.createProduct);

router.put('/:id', validateEditProduct, productController.editProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;