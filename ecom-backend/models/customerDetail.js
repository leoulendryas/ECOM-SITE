module.exports = (sequelize, DataTypes) => {
  const CustomerDetail = sequelize.define('CustomerDetail', {
    address: { type: DataTypes.TEXT, allowNull: false },
    phone_number: { type: DataTypes.STRING(20), allowNull: false },
  }, { tableName: 'customer_details', timestamps: true });

  CustomerDetail.associate = (models) => {
    CustomerDetail.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  };

  return CustomerDetail;
};
