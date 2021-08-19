'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetails.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: "order"
      });
      // define association here
    }
  };
  OrderDetails.init({
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id',
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    },
    menuName : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    menuQuantity : {
      type: DataTypes.DECIMAL(11),
      allowNull: false,
    },
    menuPrice : {
      type: DataTypes.DECIMAL(11),
      allowNull: false,
    },
    discount : {
      type: DataTypes.DECIMAL(11),
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'OrderDetails',
  });
  return OrderDetails;
};