const { models } = require('../config/db');
const SaleProduct = models.SaleProduct;

// Create a new sale product
exports.createSaleProduct = async (req, res) => {
  try {
    const saleProduct = await SaleProduct.create(req.body);
    res.status(201).json(saleProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all sale products
exports.getAllSaleProducts = async (req, res) => {
  try {
    const saleProducts = await SaleProduct.findAll({
      include: [models.Product],
    });
    res.status(200).json(saleProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get sale product by ID
exports.getSaleProductById = async (req, res) => {
  try {
    const saleProduct = await SaleProduct.findByPk(req.params.id, {
      include: [models.Product],
    });
    if (!saleProduct) {
      return res.status(404).json({ error: 'Sale product not found' });
    }
    res.status(200).json(saleProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a sale product
exports.updateSaleProduct = async (req, res) => {
  try {
    const saleProduct = await SaleProduct.findByPk(req.params.id);
    if (!saleProduct) {
      return res.status(404).json({ error: 'Sale product not found' });
    }
    await saleProduct.update(req.body);
    res.status(200).json(saleProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a sale product
exports.deleteSaleProduct = async (req, res) => {
  try {
    const saleProduct = await SaleProduct.findByPk(req.params.id);
    if (!saleProduct) {
      return res.status(404).json({ error: 'Sale product not found' });
    }
    await saleProduct.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
