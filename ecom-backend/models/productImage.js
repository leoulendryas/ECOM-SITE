module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(20),
      validate: {
        isIn: [['front', 'back', 'side']],
      },
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return ProductImage;
};
