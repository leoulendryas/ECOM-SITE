module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define('Wishlist', {}, {
    timestamps: true,
  });

  Wishlist.associate = (models) => {
    Wishlist.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Wishlist.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return Wishlist;
};
