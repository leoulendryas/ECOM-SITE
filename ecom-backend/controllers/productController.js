const { models } = require('../config/db');
const Product = models.Product;
const ProductImage = models.ProductImage;
const { filterProducts } = require('../utils/filters');

// Create a new product with images
exports.createProduct = async (req, res) => {
  try {
    const { ProductImages, ...productData } = req.body;

    const product = await Product.create(
      { 
        ...productData, 
        ProductImages 
      },
      { 
        include: [models.ProductImage] 
      }
    );

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products with images and filtering options (UNCHANGED)
exports.getAllProducts = async (req, res) => {
  try {
    const filters = {
      categoryId: req.query.categoryId,
      size: req.query.size,
      color: req.query.color,
      fit: req.query.fit,
      priceMin: req.query.priceMin,
      priceMax: req.query.priceMax,
      gender: req.query.gender,
      isNew: req.query.isNew,
      isFeatured: req.query.isFeatured
    };

    const products = await filterProducts(filters);

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get products by name (NEW METHOD)
exports.getProductsByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Name query parameter is required' });
    }

    const products = await Product.findAll({
      where: { name },
      include: [
        { model: ProductImage }
      ]
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found with the given name' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get product by ID with images
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: models.Category },
        { model: models.ProductImage }
      ]
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a product and its images
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { ProductImages, ...productData } = req.body;

    await product.update(productData);

    if (ProductImages && ProductImages.length > 0) {
      await ProductImage.destroy({ where: { product_id: product.id } });
      await ProductImage.bulkCreate(
        ProductImages.map(img => ({ ...img, product_id: product.id }))
      );
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
