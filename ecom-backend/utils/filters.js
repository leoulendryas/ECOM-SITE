const { models } = require('../config/db');
const Product = models.Product;
const ProductImage = models.ProductImage;
const { Op } = require('sequelize');

exports.filterProducts = async (filters) => {
    const whereClause = {};

    if (filters.categoryId) whereClause.category_id = filters.categoryId;

    if (filters.size) whereClause.size = { [Op.iLike]: filters.size };

    if (filters.color) whereClause.color = { [Op.iLike]: filters.color };

    if (filters.fit) whereClause.fit = { [Op.iLike]: filters.fit };

    if (filters.gender) whereClause.gender = { [Op.iLike]: filters.gender };

    if (filters.priceMin && filters.priceMax) {
        whereClause.price = { [Op.between]: [Number(filters.priceMin), Number(filters.priceMax)] };
    } else if (filters.priceMin) {
        whereClause.price = { [Op.gte]: Number(filters.priceMin) };
    } else if (filters.priceMax) {
        whereClause.price = { [Op.lte]: Number(filters.priceMax) };
    }

    // Add filtering for new and featured products
    if (filters.isNew === 'true') whereClause.is_new = true;
    if (filters.isFeatured === 'true') whereClause.is_featured = true;

    return await Product.findAll({
        where: whereClause,
        include: [
            { model: ProductImage },
            { model: models.Category }
        ]
    });
};
