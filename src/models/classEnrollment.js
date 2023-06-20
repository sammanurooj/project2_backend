import { Model } from 'sequelize';

export default (sequelize, { INTEGER }) => {
  class Enrollment extends Model {
    static associate(models) {
      Enrollment.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student',
      });
      Enrollment.belongsTo(models.Subject, {
        foreignKey: 'subjectId',
        as: 'subject',
      });
    }
  }

  Enrollment.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      studentId: {
        type: INTEGER,
        allowNull: true,
      },
      subjectId: {
        type: INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Enrollment',
      timestamps: true,
    }
  );

  return Enrollment;
};
