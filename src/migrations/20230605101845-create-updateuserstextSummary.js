'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable({
      tableName: 'SummaryTexts',
      schema: process.env.SCHEMA_NAME
    }, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userText: {
        type: Sequelize.TEXT
      },
      summarizeText: {
        type: Sequelize.TEXT
      },
      userId: {

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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SummaryTexts');
  }
};