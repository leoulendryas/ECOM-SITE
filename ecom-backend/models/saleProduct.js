module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    sale_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    sale_start_date: { type: DataTypes.DATE, allowNull: false },
    sale_end_date: { type: DataTypes.DATE, allowNull: false },
  }, { tableName: 'sale_products', timestamps: true });

  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
  };

  return SaleProduct;
};
