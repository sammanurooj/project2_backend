export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      {
        tableName: 'ApplicationUsers',
        schema: process.env.SCHEMA_NAME,
      },
      [
        {
          name: 'test',
          email: 'test@gmail.com',
          password: 'test123',
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
        tableName: 'ApplicationUsers',
        schema: process.env.SCHEMA_NAME,
      },
      null,
      {}
    );
  },
};
