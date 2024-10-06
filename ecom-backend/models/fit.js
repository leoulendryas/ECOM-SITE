module.exports = (sequelize, DataTypes) => {
  const Fit = sequelize.define('Fit', {
    fit: { type: DataTypes.STRING(20), allowNull: false, unique: true }
  }, { tableName: 'fits', timestamps: true });

  Fit.associate = (models) => {
    Fit.belongsToMany(models.Product, { through: 'ProductFits', foreignKey: 'fit_id' });
  };

  return Fit;
};
