'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            { schema: 'project2', tableName: 'Users' },
            'Location',
            { type: Sequelize.STRING, allowNull: true }
        );


    },


    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            { schema: 'project2', tableName: 'Users' },
            'Location'
        );
    },
};
