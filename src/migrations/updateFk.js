'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint({ schema: 'project2', tableName: 'Users' }, {
            fields: ['locationId'],
            type: 'foreign key',
            name: 'fk_users_location',
            references: {
                table: {
                    tableName: 'UserLocations',

                    schema: 'project2',
                },
                field: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint({ schema: 'project2', tableName: 'Users' }, 'fk_users_location');
    },
};
