module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    color: { type: DataTypes.STRING(30) },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_new: { type: DataTypes.BOOLEAN, defaultValue: false },
    gender: { type: DataTypes.STRING(20), validate: { isIn: [['Men', 'Women', 'Kids']] } },
    category_id: { // Added the category_id field
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories', // Reference the Category model
        key: 'id' // Assuming the primary key is 'id'
      }
    }
  }, { tableName: 'products', timestamps: true });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: 'category_id', onDelete: 'SET NULL' });
    Product.hasMany(models.SaleProduct, { foreignKey: 'product_id', onDelete: 'CASCADE' });
    Product.hasMany(models.Wishlist, { foreignKey: 'product_id', onDelete: 'CASCADE' });
    Product.hasMany(models.CartItem, { foreignKey: 'product_id', onDelete: 'CASCADE' });
    Product.hasMany(models.OrderItem, { foreignKey: 'product_id', onDelete: 'SET NULL' });
    Product.hasMany(models.ProductImage, { foreignKey: 'product_id', onDelete: 'CASCADE' });

    // Many-to-Many relationship with sizes and fits
    Product.belongsToMany(models.Size, { through: 'ProductSizes', foreignKey: 'product_id' });
    Product.belongsToMany(models.Fit, { through: 'ProductFits', foreignKey: 'product_id' });
  };

  return Product;
};
