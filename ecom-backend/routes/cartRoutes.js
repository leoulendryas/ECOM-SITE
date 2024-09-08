const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Cart routes
router.post('/', cartController.createCart);
router.get('/:user_id', cartController.getCartByUserId);
router.post('/items', cartController.addItemToCart);
router.put('/items/:id', cartController.updateCartItem);
router.delete('/items/:id', cartController.removeItemFromCart);

module.exports = router;
