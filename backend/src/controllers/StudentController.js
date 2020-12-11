const Student = require('../models/Student')

module.exports = {
    async show(req, res){
        const { student_id } = req.params
        const student = Student.findByPk(student_id)

        return res.json(student)
    },
    
    async index(req, res){
        const students = await Student.findAll()

        return res.json(students)
    },

    async store(req, res){
        const { name, email, cpf, locked } = req.body

        const checkEmail = await Student.findOne({ where: { email } })
        const checkCpf = await Student.findOne({ where: { cpf } })

        if(name == '' || email == '' || cpf == ''){
            return res.status(400).json({ error: 'Preencha todos os campos!' })
        }
        if(checkEmail){
            return res.status(409).json({ error: 'Já há um aluno usando este e-mail!' })
        }
        if(checkCpf){
            return res.status(409).json({ error: 'Já há um aluno usando este CPF!' })
        }

        const student = await Student.create({ name, email, cpf, locked })

        return res.status(201).json({ success: 'Aluno criado com sucesso!', student })
    },

    async update(req, res){
        const { student_id } = req.params
        const { name, email, locked } = req.body

        if(name == '' || email == ''){
            return res.status(400).json({ error: 'Preencha todos os campos' })
        }

        const student = await Student.findByPk(student_id)

        if(email !== student.email){
            const studentExists = await Student.findOne({ where: { email } })
            if(studentExists) res.status(409).json({ error: 'Esse email já está cadastrado em outro aluno!' })
        }

        const updateStudent = await student.update({ name, email, locked })

        return res.status(200).json({success: 'Cadastro atualizado com sucesso!', updateStudent})
    },

    async destroy(req, res){
        const { student_id } = req.params

        const student = await Student.findByPk(student_id)

        if(student.locked == false){
            return res.status(400).json({ error: 'Você só pode excluir uma matrícula se ela estiver trancada!' })
        }
        await Student.destroy({ where: { id: student_id} })
        return res.status(200).json({ success: 'Cadastro deletado com sucesso!' })
    }
}