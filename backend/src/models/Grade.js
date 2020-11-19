const { Model, DataTypes } = require('sequelize')

class Grade extends Model {
    static init(sequelize){
        super.init({
            grade: DataTypes.DECIMAL,
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'students' })
        this.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'subjects' })
    }
}

module.exports = Grade