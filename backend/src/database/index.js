const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const connection = new Sequelize(dbConfig)

const Student = require('../models/Student')
const Grade = require('../models/Grade')

Student.init(connection)
Grade.init(connection)

Student.associate(connection.models)
Grade.associate(connection.models)
