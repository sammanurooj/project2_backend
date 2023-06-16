'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable({
            tableName: 'Users',
            schema: process.env.SCHEMA_NAME
        },
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING
                },
                email: {
                    type: Sequelize.STRING
                },
                password: {
                    type: Sequelize.STRING
                },
                role: {
                    type: Sequelize.STRING
                },
                Location: {
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
        return queryInterface.dropTable('Users');
    }
};