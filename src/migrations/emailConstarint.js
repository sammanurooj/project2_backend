'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint({ schema: 'project2', tableName: 'Users' }, {
            fields: ['email'],
            type: 'unique',
            name: 'unique_email_constraint',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint({ schema: 'project2', tableName: 'Users' }, 'unique_email_constraint');
    },
};
