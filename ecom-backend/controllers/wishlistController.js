const db = require('../config/db');

const Wishlist = db.Wishlist;

// Add a product to the wishlist
exports.addProductToWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.create({
      user_id: req.body.user_id,
      product_id: req.body.product_id,
    });
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get wishlist for a user
exports.getWishlistByUserId = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: { user_id: req.params.user_id },
      include: [db.Product],
    });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a product from the wishlist
exports.removeProductFromWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findOne({
      where: { user_id: req.params.user_id, product_id: req.params.product_id },
    });
    if (!wishlistItem) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }
    await wishlistItem.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
