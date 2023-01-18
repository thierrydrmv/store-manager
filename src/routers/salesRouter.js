const express = require('express');
const { salesController } = require('../controllers');
const validateName = require('../middlewares/validateProductName');

const router = express.Router();

router.get('/', salesController.allSales);

router.get('/:id', salesController.getSales);

router.post('/', validateName, salesController.createSales);

module.exports = router;