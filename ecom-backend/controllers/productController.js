const { models } = require('../config/db');
const Product = models.Product;
const ProductImage = models.ProductImage;
const { Op } = require('sequelize'); // Import Sequelize operator
const { filterProducts } = require('../utils/filters');

// Create a new product with images, including fit and size
exports.createProduct = async (req, res) => {
  try {
    const { ProductImages, sizes, fits, ...productData } = req.body;

    // Create the product
    const product = await Product.create(
      { 
        ...productData, 
        ProductImages: ProductImages.map(img => ({ ...img })) // Handle product images
      },
      { 
        include: [models.ProductImage] 
      }
    );

    // Associate sizes and fits
    if (sizes && sizes.length > 0) {
      await product.addSizes(sizes); // Assuming you have set up the association
    }
    if (fits && fits.length > 0) {
      await product.addFits(fits); // Assuming you have set up the association
    }

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products with images and filtering options, including fit and size

exports.getAllProducts = async (req, res) => {
  try {
    const filters = {
      categoryId: req.query.categoryId ? req.query.categoryId : undefined, // Ensure it only includes if defined
      size: req.query.size ? req.query.size : undefined,
      color: req.query.color ? req.query.color : undefined,
      fit: req.query.fit ? req.query.fit : undefined,
      priceMin: req.query.priceMin ? req.query.priceMin : undefined,
      priceMax: req.query.priceMax ? req.query.priceMax : undefined,
      gender: req.query.gender ? req.query.gender : undefined,
      isNew: req.query.isNew ? req.query.isNew : undefined,
      isFeatured: req.query.isFeatured ? req.query.isFeatured : undefined
    };

    // Remove any undefined filters
    Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);

    const products = await Product.findAll({
      where: filters,
      include: [
        { model: ProductImage },
        { model: models.Size, through: { attributes: [] } },
        { model: models.Fit, through: { attributes: [] } }
      ]
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get products by name (including fit and size if needed)
exports.getProductsByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Name query parameter is required' });
    }

    const products = await Product.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } }, // Case insensitive
      include: [
        { model: ProductImage },
        { model: models.Size, through: { attributes: [] } }, // Include sizes
        { model: models.Fit, through: { attributes: [] } } // Include fits
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

// Get product by ID with images, fit, and size
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: models.Category },
        { model: ProductImage },
        { model: models.Size, through: { attributes: [] } }, // Include sizes
        { model: models.Fit, through: { attributes: [] } } // Include fits
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

// Update a product and its images, fit, and size
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { ProductImages, sizes, fits, ...productData } = req.body;

    // Update product data
    await product.update({ ...productData });

    // Update sizes
    if (sizes && sizes.length > 0) {
      await product.setSizes(sizes); // Replace existing sizes
    }
    
    // Update fits
    if (fits && fits.length > 0) {
      await product.setFits(fits); // Replace existing fits
    }

    // Update images if provided
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
