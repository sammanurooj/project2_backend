export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      {
        tableName: 'UserProjects',
        schema: process.env.SCHEMA_NAME,
      },
      [
        {
          pic: 'https://demos.creative-tim.com/material-dashboard-react/static/media/home-decor-1.05e218fd495ccc65c99d.jpg',
          title: 'test project',
          description: 'As Uber works through a huge amount of internal management turmoil.',
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
        tableName: 'UserProjects',
        schema: process.env.SCHEMA_NAME,
      },
      null,
      {}
    );
  },
};
