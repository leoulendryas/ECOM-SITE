module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING(50), unique: true, allowNull: false },
  }, { tableName: 'categories', timestamps: true });

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: 'category_id', onDelete: 'SET NULL' });
  };

  return Category;
};
