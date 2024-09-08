module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  }, { tableName: 'order_items', timestamps: true });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'SET NULL' });
  };

  return OrderItem;
};
