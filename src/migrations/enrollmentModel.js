'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable({
            tableName: 'Enrollments',
            schema: process.env.SCHEMA_NAME
        },
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                studentId: {
                    type: Sequelize.INTEGER
                },
                subjectId: {
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
        return queryInterface.dropTable('Enrollments');
    }
};