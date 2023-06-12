import { Model } from 'sequelize';

export default (sequelize, { STRING, INTEGER }) => {
  class UserLocationTable extends Model {
    // static associate() {
    // }
  }

  UserLocationTable.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },

      location: {
        type: STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'userLocation',
      timestamps: true,
    }
  );
  return UserLocationTable;
};
