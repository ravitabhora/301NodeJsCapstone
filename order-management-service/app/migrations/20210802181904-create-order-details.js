'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.UUID,
        references: {
          model: 'Orders', // Refers to table name
          key: 'id', // Refers to column name in table
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      menuName : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      menuQuantity : {
        type: Sequelize.DECIMAL(11),
        allowNull: false,
      },
      menuPrice : {
        type: Sequelize.DECIMAL(11),
        allowNull: false,
      },
      discount : {
        type: Sequelize.DECIMAL(11),
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrderDetails');
  }
};