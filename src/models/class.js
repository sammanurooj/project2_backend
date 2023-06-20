import { Model } from 'sequelize';

export default (sequelize, { STRING, INTEGER }) => {
  class Subject extends Model {
    static associate(models) {
      Subject.belongsToMany(models.Student, {
        through: models.Enrollment,
        foreignKey: 'subjectId',
        as: 'students',
      });
    }
  }

  Subject.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      subjectName: {
        type: STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Subject',
      timestamps: true,
    }
  );

  return Subject;
};
