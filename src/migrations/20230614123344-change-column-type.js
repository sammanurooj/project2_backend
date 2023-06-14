'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Step 1: Add a new column with the desired type
    return queryInterface.addColumn(
      { schema: 'project2', tableName: 'Users' },
      'locationid',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    )
      .then(() => {
        // Step 2: Update the new column with the converted values
        return queryInterface.sequelize.query(`
          UPDATE "project2"."Users"
          SET "locationid" = CAST("Location" AS INTEGER)
        `);
      })
      .then(() => {
        // Step 3: Remove the old column
        return queryInterface.removeColumn(
          { schema: 'project2', tableName: 'Users' },
          'Location'
        );
      })
      .then(() => {
        // Step 4: Rename the new column to match the original name
        return queryInterface.renameColumn(
          { schema: 'project2', tableName: 'Users' },
          'locationid',
          'Location'
        );
      });
  },

  down: (queryInterface, Sequelize) => {
    // Reverting the migration by reversing the steps
    return queryInterface.addColumn(
      { schema: 'project2', tableName: 'User' },
      'NewLocation',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    )
      .then(() => {
        return queryInterface.sequelize.query(`
          UPDATE "project2"."User"
          SET "NewLocation" = "Location"
        `);
      })
      .then(() => {
        return queryInterface.removeColumn(
          { schema: 'project2', tableName: 'User' },
          'Location'
        );
      })
      .then(() => {
        return queryInterface.renameColumn(
          { schema: 'project2', tableName: 'User' },
          'NewLocation',
          'Location'
        );
      });
  }
};
