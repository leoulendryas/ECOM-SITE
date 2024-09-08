module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define('Wishlist', {
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, { tableName: 'wishlist', timestamps: false });

  Wishlist.associate = (models) => {
    Wishlist.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    Wishlist.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
  };

  return Wishlist;
};
