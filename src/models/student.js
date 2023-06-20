import { Model } from 'sequelize';

export default (sequelize, { STRING, INTEGER }) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsToMany(models.Subject, {
        through: models.Enrollment,
        foreignKey: 'studentId',
        as: 'subjects',
      });
    }
  }

  Student.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      studentName: {
        type: STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Student',
      timestamps: true,
    }
  );

  return Student;
};
