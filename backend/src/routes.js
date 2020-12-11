const express = require('express')
const StudentController = require('./controllers/StudentController')
const GradeController = require('./controllers/GradeController')
const SubjectController = require('./controllers/SubjectController')

const routes  = express.Router()
require('dotenv').config()

//STUDENTS ROUTES -- OK
routes.get('/students/:student_id', StudentController.show)
routes.get('/students', StudentController.index)
routes.post('/students', StudentController.store)
routes.put('/students/:student_id', StudentController.update)
routes.delete('/students/:student_id', StudentController.destroy)

//GRADES ROUTES -- OK
routes.get('/students/:student_id/grade', GradeController.index)
routes.get('/students/:student_id/subject/:subject_id/grade', GradeController.show)
routes.post('/students/:student_id/subject/:subject_id/grade', GradeController.store)
routes.put('/students/:student_id/subject/:subject_id/grade', GradeController.update)
routes.delete('/students/:student_id/subject/:subject_id/grade', GradeController.destroy)

//SUBJECTS ROUTES -- OK
routes.get('/subjects/:name', SubjectController.show)
routes.get('/subjects', SubjectController.index)
routes.post('/subjects', SubjectController.store)
routes.put('/subjects/:subject_id', SubjectController.update)
routes.delete('/subjects/:subject_id', SubjectController.destroy)

module.exports = routes;