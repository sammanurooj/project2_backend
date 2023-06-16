import { Model } from 'sequelize';

export default (sequelize, { STRING, INTEGER }) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.UserLocation, {
        foreignKey: 'Location',
        as: 'userLocations',
      });
    }
  }

  User.init(
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
      Location: {
        type: INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
    }
  );

  return User;
};
