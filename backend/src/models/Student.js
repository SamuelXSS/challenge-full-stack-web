const { Model, DataTypes } = require('sequelize')

class Student extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            cpf: DataTypes.STRING,
            locked: DataTypes.BOOLEAN
        }, {
            sequelize
        })
    }

    static associate(models){
        this.hasOne(models.Grade, { foreignKey: 'student_id', as: 'grades' })
    }
}

module.exports = Student