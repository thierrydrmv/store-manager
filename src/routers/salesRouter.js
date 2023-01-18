const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.allSales);

router.get('/:id', salesController.getSales);

module.exports = router;