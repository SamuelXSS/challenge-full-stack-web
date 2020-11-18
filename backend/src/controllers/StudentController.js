const Student = require('../models/Student')

module.exports = {
    async index(req, res){
        const students = await Student.findAll()

        return res.json(students)
    },

    async store(req, res){
        const { name, email, cpf, locked } = req.body

        const student = await Student.create({ name, email, cpf, locked })

        return res.json(student)
    },

    async update(req, res){
        const { student_id } = req.params
        const { name, email, locked } = req.body

        const student = await Student.findByPk(student_id)

        if(email !== student.email){
            const studentExists = await Student.findOne({ where: { email } })
            if(studentExists) res.status(400).json({ error: 'Email already exists.' })
        }

        const updateStudent = await student.update({ name, email, locked })

        return res.json(updateStudent)
    },

    async destroy(req, res){
        const { student_id } = req.params

        const student = await Student.findByPk(student_id)

        if(student.locked == false){
            return res.status(401).json({ error: 'You can only delete an user if the registration is locked!' })
        }
        const deleted = await Student.destroy({ where: { id: student_id} })
        if(deleted) res.json({ success: 'User deleted!' })
    }
}