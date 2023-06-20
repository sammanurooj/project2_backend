'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint({ schema: 'project2', tableName: 'Enrollments' }, {
            fields: ['subjectId'],
            type: 'foreign key',
            name: 'fk_subject_table',
            references: {
                table: {
                    tableName: 'Subjects',

                    schema: 'project2',
                },
                field: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint({ schema: 'project2', tableName: 'Enrollments' }, 'fk_subject_table');
    },
};
