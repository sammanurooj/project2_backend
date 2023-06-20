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
      summarizeText: {
        type: TEXT,
        allowNull: true,
      },

      userId: {
        type: INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'SummaryText',
      timestamps: true,
    }
  );
  return textsummeryTable;
};
