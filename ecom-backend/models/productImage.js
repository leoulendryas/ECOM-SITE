module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    image_url: { type: DataTypes.TEXT, allowNull: false },
    position: { type: DataTypes.STRING(20), validate: { isIn: [['front', 'back', 'left', 'right', 'other']] } },
    position_sequence: { type: DataTypes.INTEGER, defaultValue: 1 },
  }, { tableName: 'product_images', timestamps: true });

  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
  };

  return ProductImage;
};
