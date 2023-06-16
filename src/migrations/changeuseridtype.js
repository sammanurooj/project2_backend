'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        // Step 1: Add a new column with the desired type
        return queryInterface.addColumn(
            { schema: 'project2', tableName: 'UserLocations' },
            'locationid',
            {
                type: Sequelize.INTEGER,
                allowNull: true,
            }
        )
            .then(() => {
                // Step 2: Update the new column with the converted values
                return queryInterface.sequelize.query(`
          UPDATE "project2"."UserLocations"
          SET "locationid" = CAST("userId" AS INTEGER)
        `);
            })
            .then(() => {
                // Step 3: Remove the old column
                return queryInterface.removeColumn(
                    { schema: 'project2', tableName: 'UserLocations' },
                    'userId'
                );
            })
            .then(() => {
                // Step 4: Rename the new column to match the original name
                return queryInterface.renameColumn(
                    { schema: 'project2', tableName: 'UserLocations' },
                    'locationid',
                    'userId'
                );
            });
    },

    down: (queryInterface, Sequelize) => {
        // Reverting the migration by reversing the steps
        return queryInterface.addColumn(
            { schema: 'project2', tableName: 'UserLocations' },
            'NewLocation',
            {
                type: Sequelize.STRING,
                allowNull: true,
            }
        )
            .then(() => {
                return queryInterface.sequelize.query(`
          UPDATE "project2"."UserLocations"
          SET "NewLocation" = "locationid"
        `);
            })
            .then(() => {
                return queryInterface.removeColumn(
                    { schema: 'project2', tableName: 'UserLocations' },
                    'locationid'
                );
            })
            .then(() => {
                return queryInterface.renameColumn(
                    { schema: 'project2', tableName: 'UserLocations' },
                    'NewLocation',
                    'userId'
                );
            });
    }
};
