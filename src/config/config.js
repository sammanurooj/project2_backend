import 'dotenv/config';

module.exports = {
  development: {
    // dialect: 'sqlite',
    // storage: './db.development.sqlite'
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'datics',
    database: process.env.DB_NAME || 'Project2',
    host: process.env.DB_HOSTNAME || 'localhost',
    type: 'default',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    schema: process.env.SCHEMA_NAME || 'project2',
    logging: true,
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    type: 'default',
    port: process.env.DB_PORT,
    dialect: 'postgres',
    schema: process.env.SCHEMA_NAME,
  },
};
