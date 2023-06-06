export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      {
        tableName: 'ProjectTables',
        schema: process.env.SCHEMA_NAME,
      },
      [
        {
          avatar: 'hello',
          projects: 'Asana',
          budget: '2500',
          status: 'working',
          completion: '60%',
          Action: true,
          createdAt: '2020-01-01T00:00:00.000Z',
          updatedAt: '2020-01-01T00:00:00.000Z',
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      {
        tableName: 'ProjectTables',
        schema: process.env.SCHEMA_NAME,
      },
      null,
      {}
    );
  },
};
