import { Model } from 'sequelize';

export default (sequelize, { STRING, INTEGER }) => {
  class AuthUserTable extends Model {
    // static associate() {
    // }
  }

  AuthUserTable.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: STRING,
        allowNull: false,
      },

      role: {
        type: STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
    }
  );
  return AuthUserTable;
};
