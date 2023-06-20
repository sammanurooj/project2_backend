'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            { schema: 'project2', tableName: 'textsummaries' },
            'userId',
            { type: Sequelize.INTEGER, allowNull: true }
        );


    },


    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            { schema: 'project2', tableName: 'textsummaries' },
            'userId'
        );
    },
};
