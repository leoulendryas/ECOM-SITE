const { models } = require('../config/db');
const Cart = models.Cart;
const CartItem = models.CartItem;

// Create a cart for a user
exports.createCart = async (req, res) => {
  try {
    const cart = await Cart.create({ user_id: req.body.user_id });
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get cart by user ID
exports.getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { user_id: req.params.user_id },
      include: [models.CartItem],
    });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
  try {
    const { cart_id, product_id, quantity, price_at_time_of_addition, size } = req.body;

    // Validate required fields
    if (!size) {
      return res.status(400).json({ error: 'Size is required' });
    }

    const cartItem = await CartItem.create({
      cart_id,
      product_id,
      quantity,
      price_at_time_of_addition,
      size, // Include size
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update cart item (quantity and size)
exports.updateCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    const { quantity, size } = req.body;

    // Validate required fields
    if (!size) {
      return res.status(400).json({ error: 'Size is required' });
    }

    await cartItem.update({ quantity, size });

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    await cartItem.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
