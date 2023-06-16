import { TEXT, Model } from 'sequelize';

export default (sequelize, { TEXT, INTEGER }) => {
  class textsummeryTable extends Model {
    // static associate() {
    // }
  }

  textsummeryTable.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      userText: {
        type: TEXT,
        allowNull: true,
      },
      SummerizeText: {
        type: TEXT,
        allowNull: true,
      },

      userID: {
        type: INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'textsummarie',
      timestamps: true,
    }
  );
  return textsummeryTable;
};
