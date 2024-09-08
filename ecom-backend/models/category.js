module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: 'category_id', as: 'products' });
  };

  return Category;
};
