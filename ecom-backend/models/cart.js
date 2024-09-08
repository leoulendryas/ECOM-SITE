module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, { tableName: 'cart', timestamps: false });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    Cart.hasMany(models.CartItem, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
  };

  return Cart;
};
