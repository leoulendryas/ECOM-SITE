module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    size: { // Add the size column
      type: DataTypes.STRING(50), // Adjust length as needed
      allowNull: false, // Change to false if size is mandatory
    },
  }, {
    tableName: 'order_items',
    timestamps: true,
  });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'SET NULL' });
  };

  return OrderItem;
};
