const Grade = require('../models/Grade')
const Student = require('../models/Student')
const Subject = require('../models/Subject')

module.exports = {
    async index(req, res){
        const { student_id } = req.params

        const student = await Student.findByPk(student_id)

        if(!student){
            return res.status(400).json({ student: 'Student not found' })
        }

        const grade = await Grade.findAll({ where: { student_id }, include: {model: Subject, as: 'subjects'} })

        res.json(grade)
    },
    async show(req, res){
        const { student_id, subject_id } = req.params

        const student = await Student.findByPk(student_id)
        const subject = await Subject.findByPk(subject_id)

        if(!student){
            return res.status(400).json({ student: 'Student not found' })
        }
        if(!subject){
            return res.status(400).json({ subject: 'Subject not found' })
        }

        const grade = await Grade.findAll({ where: { subject_id, student_id } })

        res.json(grade)
    },

    async store(req, res){
        const { student_id, subject_id } = req.params
        const { grade } = req.body

        const student = await Student.findByPk(student_id)
        const subject = await Subject.findByPk(subject_id)

        if(!student){
            return res.status(400).json({ student: 'Student not found' })
        }
        if(!subject){
            return res.status(400).json({ subject: 'Subject not found' })
        }
        if(student.locked == true){
            return res.status(401).json({ error: 'You cannot grade a student with a locked registration!' })
        }

        const giveGrade = await Grade.create({
            grade,
            student_id,
            subject_id
        })

        return res.json(giveGrade)
        
    },

    async update(req, res){
        const { student_id, subject_id } = req.params
        const { value } = req.body

        const student = await Student.findByPk(student_id)
        const subject = await Subject.findByPk(subject_id)
        const grade = await Grade.findOne({ where: { student_id, subject_id } })

        if(!student){
            return res.status(400).json({ student: 'Student not found' })
        }
        if(!subject){
            return res.status(400).json({ subject: 'Subject not found' })
        }
        if(student.locked == true){
            return res.status(401).json({ error: 'You cannot grade a student with a locked registration!' })
        }

        const updateGrade = await grade.update({ grade: value })

        return res.json(updateGrade)
    },

    async destroy(req, res){
        const { student_id, subject_id } = req.params
        
        const student = await Student.findByPk(student_id)
        const subject = await Subject.findByPk(subject_id)

        if(!student){
            return res.status(400).json({ student: 'Student not found' })
        }
        if(!subject){
            return res.status(400).json({ subject: 'Subject not found' })
        }
        if(student.locked == true){
            return res.status(401).json({ error: 'You cannot delete a student\'s grade with the registration locked!' })
        }

        const deleted = await studentGrade.destroy({ where: { subject_id } })
        if(deleted) res.json({ success: 'Grade deleted!' })
    }
}