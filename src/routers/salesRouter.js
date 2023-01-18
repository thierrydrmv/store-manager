const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.allSales);

router.get('/:id', salesController.getSales);

router.post('/', salesController.createSales);

router.delete('/:id', salesController.deleteSeal);

module.exports = router;