const express = require('express')
const StudentController = require('./controllers/StudentController')
const GradeController = require('./controllers/GradeController')

const routes  = express.Router()
require('dotenv').config()

//STUDENTS ROUTES -- OK
routes.get('/students', StudentController.index)
routes.post('/students', StudentController.store)
routes.put('/students/:student_id', StudentController.update)
routes.delete('/students/:student_id', StudentController.destroy)

//GRADES ROUTES -- OK
routes.post('/grades', GradeController.store)
routes.put('/students/:student_id/grade', GradeController.update)
routes.delete('/students/:student_id/grade', GradeController.destroy)

module.exports = routes;