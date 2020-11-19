const { Model, DataTypes } = require('sequelize')

class Subject extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models){
        this.hasMany(models.Grade, { foreignKey: 'subject_id', as: 'grades' })
    }
}

module.exports = Subject