const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const connection = new Sequelize(dbConfig)

const Student = require('../models/Student')
const Grade = require('../models/Grade')
const Subject = require('../models/Subject')

Student.init(connection)
Grade.init(connection)
Subject.init(connection)

Student.associate(connection.models)
Grade.associate(connection.models)
Subject.associate(connection.models)
