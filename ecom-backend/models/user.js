const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: 'user_id', onDelete: 'SET NULL' });
    User.hasMany(models.Wishlist, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    User.hasMany(models.Cart, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    User.hasMany(models.CustomerDetail, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  };

  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  User.prototype.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
