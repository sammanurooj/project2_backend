export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      {
        tableName: 'AuthorTables',
        schema: process.env.SCHEMA_NAME,
      },
      [
        {
          avatar: 'hello',
          Author: 'john',
          Function: 'Manager',
          status: 'Active',
          Employeed: '2020-01-01',
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
        tableName: 'AuthorTables',
        schema: process.env.SCHEMA_NAME,
      },
      null,
      {}
    );
  },
};
