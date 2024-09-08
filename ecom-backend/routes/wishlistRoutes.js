const express = require('express');
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', getWishlist);  // Fetch wishlist items
router.post('/', addToWishlist);  // Add a product to wishlist
router.delete('/:id', removeFromWishlist);  // Remove a product from wishlist

module.exports = router;
