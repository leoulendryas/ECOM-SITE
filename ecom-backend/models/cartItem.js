module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    price_at_time_of_addition: { type: DataTypes.DECIMAL(10, 2) },
    size: { type: DataTypes.STRING(10), allowNull: false }, // Add the size column
  }, { tableName: 'cart_items', timestamps: true });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
    CartItem.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
  };

  return CartItem;
};
