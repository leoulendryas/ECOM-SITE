const express = require('express');
const router = express.Router();
const saleProductController = require('../controllers/saleProductController');

// Sale Product routes
router.post('/', saleProductController.createSaleProduct);
router.get('/', saleProductController.getAllSaleProducts);
router.get('/:id', saleProductController.getSaleProductById);
router.put('/:id', saleProductController.updateSaleProduct);
router.delete('/:id', saleProductController.deleteSaleProduct);

module.exports = router;
