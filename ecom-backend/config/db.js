// config/db.js
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // set to console.log to see the raw SQL queries
  }
);

const models = {
  Cart: require('../models/cart')(sequelize, Sequelize.DataTypes),
  CartItem: require('../models/cartItem')(sequelize, Sequelize.DataTypes),
  Category: require('../models/category')(sequelize, Sequelize.DataTypes),
  CustomerDetail: require('../models/customerDetail')(sequelize, Sequelize.DataTypes),
  Order: require('../models/order')(sequelize, Sequelize.DataTypes),
  OrderItem: require('../models/orderItem')(sequelize, Sequelize.DataTypes),
  Product: require('../models/product')(sequelize, Sequelize.DataTypes),
  ProductImage: require('../models/productImage')(sequelize, Sequelize.DataTypes),
  SaleProduct: require('../models/saleProduct')(sequelize, Sequelize.DataTypes),
  User: require('../models/user')(sequelize, Sequelize.DataTypes),
  Wishlist: require('../models/wishlist')(sequelize, Sequelize.DataTypes),
};

// Apply associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { sequelize, models };
