const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Wishlist routes
router.post('/', wishlistController.addProductToWishlist);
router.get('/:user_id', wishlistController.getWishlistByUserId);
router.delete('/:user_id/:product_id', wishlistController.removeProductFromWishlist);

module.exports = router;
