module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define('Size', {
    size: { type: DataTypes.STRING(10), allowNull: false, unique: true }
  }, { tableName: 'sizes', timestamps: true });

  Size.associate = (models) => {
    Size.belongsToMany(models.Product, { through: 'ProductSizes', foreignKey: 'size_id' });
  };

  return Size;
};
