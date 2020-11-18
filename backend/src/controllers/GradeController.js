const Grade = require('../models/Grade')
const Student = require('../models/Student')

module.exports = {

    async store(req, res){
        const { student_id } = req.params
        const { grade } = req.body

        const student = await Student.findByPk(student_id)

        if(!student){
            return res.status(400).json({ student: 'Student not found' })
        }

        if(student.locked == true){
            return res.status(401).json({ error: 'You cannot grade a student with a locked registration!' })
        }

        const giveGrade = await Grade.create({
            grade,
            student_id
        })

        return res.json(giveGrade, { success: 'Grade successfully sent!' })
        
    },

    async update(req, res){
        const { student_id } = req.params
        const { grade } = req.body

        const studentGrade = await Grade.findByPk(student_id)
        const student = await Student.findByPk(student_id)

        if(!studentGrade){
            return res.status(400).json({ student: 'No grade associated with the student was found' })
        }

        if(student.locked == true){
            return res.status(401).json({ error: 'You cannot grade a student with a locked registration!' })
        }

        const updateGrade = await studentGrade.update({ grade })

        return res.json(updateGrade)
    },

    async destroy(req, res){
        const { student_id } = req.params
        
        const studentGrade = await Grade.findByPk(student_id)
        const student = await Student.findByPk(student_id)

        if(!studentGrade){
            return res.status(400).json({ student: 'No grade associated with the student was found' })
        }

        if(student.locked == true){
            return res.status(401).json({ error: 'You cannot delete a student\'s grade with the registration locked!' })
        }
        const deleted = await studentGrade.destroy()
        if(deleted) res.json({ success: 'Grade deleted!' })
    }
}