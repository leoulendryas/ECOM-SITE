module.exports = (sequelize, DataTypes) => {
  const CustomerDetail = sequelize.define('CustomerDetail', {
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  CustomerDetail.associate = (models) => {
    CustomerDetail.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return CustomerDetail;
};
