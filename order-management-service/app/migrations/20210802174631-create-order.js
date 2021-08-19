'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      restId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      custId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      paybleAmount: {
        type: Sequelize.DECIMAL(11),
        allowNull: false
      },
      address: {
        type: Sequelize.TEXT, 
        allowNull: false
      },
      paymentMethod: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Orders');
  }
};