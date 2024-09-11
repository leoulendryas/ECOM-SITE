const { models } = require('../config/db');
const Product = models.Product;
const ProductImage = models.ProductImage;
const { filterProducts } = require('../utils/filters');

// Create a new product with images
exports.createProduct = async (req, res) => {
  try {
    const { ProductImages, ...productData } = req.body;

    // Create product along with its images
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

// Get all products with images and filtering options
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
      isNew: req.query.isNew,        // Capture 'isNew' filter
      isFeatured: req.query.isFeatured // Capture 'isFeatured' filter
    };

    const products = await filterProducts(filters);

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
        { model: models.Category },  // Include associated Category
        { model: models.ProductImage }  // Include associated ProductImages
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

    // Update product and associated images
    await product.update(productData);

    if (ProductImages && ProductImages.length > 0) {
      // Replace old images with new ones (you can adjust logic as needed)
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
