'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MakeID: {
        type: Sequelize.INTEGER
      },
      ModelID: {
        type: Sequelize.INTEGER
      },
      TypeID: {
        type: Sequelize.INTEGER
      },
      Year: {
        type: Sequelize.INTEGER
      },
      VIN: {
        type: Sequelize.STRING
      },
      Color: {
        type: Sequelize.STRING
      },
      Mileage: {
        type: Sequelize.INTEGER
      },
      Price: {
        type: Sequelize.DECIMAL
      },
      Status: {
        type: Sequelize.STRING
      },
      PurchaseDate: {
        type: Sequelize.DATE
      },
      SaleDate: {
        type: Sequelize.DATE
      },
      BuyerID: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Vehicles');
  }
};