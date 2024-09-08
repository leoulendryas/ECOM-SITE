const Product = require('../models/Product');
const { Op } = require('sequelize');

exports.filterProducts = async (filters) => {
    const whereClause = {};

    if (filters.categoryId) whereClause.categoryId = filters.categoryId;
    if (filters.size) whereClause.size = filters.size;
    if (filters.color) whereClause.color = filters.color;
    if (filters.fit) whereClause.fit = filters.fit;
    if (filters.priceMin && filters.priceMax) {
        whereClause.price = { [Op.between]: [filters.priceMin, filters.priceMax] };
    }

    return await Product.findAll({ where: whereClause });
};
