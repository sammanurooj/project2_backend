import { Model } from 'sequelize';

export default (sequelize, { STRING, INTEGER }) => {
  class UserLocation extends Model {
    static associate(models) {
      this.hasMany(models.User, {
        foreignKey: 'Location',
      });
    }
  }

  UserLocation.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      location: {
        type: STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserLocation',
      timestamps: true,
    }
  );

  return UserLocation;
};
