'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint({ schema: 'project2', tableName: 'Enrollments' }, {
            fields: ['studentId'],
            type: 'foreign key',
            name: 'fk_student_table',
            references: {
                table: {
                    tableName: 'Students',

                    schema: 'project2',
                },
                field: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint({ schema: 'project2', tableName: 'Enrollments' }, 'fk_student_table');
    },
};
