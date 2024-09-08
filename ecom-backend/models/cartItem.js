module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_at_time_of_addition: {
      type: DataTypes.DECIMAL(10, 2),
    },
  }, {
    timestamps: true,
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id', as: 'cart', onDelete: 'CASCADE' });
    CartItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product', onDelete: 'CASCADE' });
  };

  return CartItem;
};
