'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('ALTER TABLE project2.textsummaries ALTER COLUMN "userText" TYPE TEXT')
      .then(() => {
        return queryInterface.sequelize.query('ALTER TABLE project2.textsummaries ALTER COLUMN "SummerizeText" TYPE TEXT');
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('ALTER TABLE project2.textsummaries ALTER COLUMN "userText" TYPE STRING')
      .then(() => {
        return queryInterface.sequelize.query('ALTER TABLE project2.textsummaries ALTER COLUMN "SummerizeText" TYPE STRING');
      });
  }
};
