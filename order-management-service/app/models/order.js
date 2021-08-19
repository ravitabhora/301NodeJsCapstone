'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.OrderDetails, {
        foreignKey: 'orderId',
        as: "orderdetails"
      });
      // define association here
    }
  };
  Order.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    restId: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    custId: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    paybleAmount: {
      type: DataTypes.DECIMAL(11), 
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT, 
      allowNull: false
    },
    paymentMethod : {
      type: DataTypes.STRING,
		  allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: new Date()
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: new Date()
		}

  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};