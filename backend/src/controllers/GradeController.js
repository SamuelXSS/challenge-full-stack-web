const Grade = require('../models/Grade')
const Student = require('../models/Student')
const Subject = require('../models/Subject')

module.exports = {
    async index(req, res){
        const { student_id } = req.params

        const student = await Student.findByPk(student_id)

        if(!student){
            return res.status(400).json({ error: 'Aluno não encontrado' })
        }

        const grade = await Grade.findAll({ where: { student_id }, include: {model: Subject, as: 'subjects'} })

        res.json(grade)
    },
    async show(req, res){
        const { student_id, subject_id } = req.params

        const student = await Student.findByPk(student_id)
        const subject = await Subject.findByPk(subject_id)

        if(!student){
            return res.status(400).json({ error: 'Aluno não encontrado!' })
        }
        if(!subject){
            return res.status(400).json({ error: 'Matéria não econtrada' })
        }

        const grade = await Grade.findAll({ where: { subject_id, student_id } })

        res.json(grade)
    },

    async store(req, res){
        const { student_id, subject_id } = req.params
        const { grade } = req.body

        const student = await Student.findByPk(student_id)
        const subject = await Subject.findByPk(subject_id)
        const checkSubject = await Grade.findOne({ where: { subject_id, student_id } })

        if(grade == ''){
            return res.status(401).json({ error: 'Digite uma nota!' })
        }
        if(!subject_id){
            return res.status(401).json({ error: 'Selecione uma matéria!' })
        }
        if(!student){
            return res.status(400).json({ error: 'Aluno não encontrado' })
        }
        if(!subject){
            return res.status(400).json({ error: 'Matéria não econtrada' })
        }
        if(checkSubject){
            return res.status(401).json({ error: 'Já existe uma nota atribuída à essa matéria nesse aluno!' })
        }
        if(student.locked == true){
            return res.status(401).json({ error: 'Você não pode dar nota para um aluno com matrícula trancada!' })
        }

        const giveGrade = await Grade.create({
            grade,
            student_id,
            subject_id
        })

        return res.status(200).json({ success: 'Nota atribuída com sucesso', giveGrade})
        
    },

    async update(req, res){
        const { student_id, subject_id } = req.params
        const { value } = req.body

        const student = await Student.findByPk(student_id)
        const subject = await Subject.findByPk(subject_id)
        const grade = await Grade.findOne({ where: { student_id, subject_id } })

        if(!student){
            return res.status(400).json({ error: 'Aluno não encontrado' })
        }
        if(!subject){
            return res.status(400).json({ error: 'Matéria não encontrada' })
        }
        if(student.locked == true){
            return res.status(401).json({ error: 'Você não pode dar nota para um aluno com matrícula trancada!' })
        }

        const updateGrade = await grade.update({ grade: value })

        return res.status(200).json({ sucess: 'Nota atribuída com sucesso', updateGrade})
    },

    async destroy(req, res){
        const { student_id, subject_id } = req.params
        
        const student = await Student.findByPk(student_id)
        const subject = await Subject.findByPk(subject_id)

        if(!student){
            return res.status(400).json({ error: 'Aluno não encontrado' })
        }
        if(!subject){
            return res.status(400).json({ error: 'Matéria não encontrada' })
        }
        if(student.locked == true){
            return res.status(401).json({ error: 'Você não pode deletar a nota de um aluno com matrícula trancada' })
        }

        await studentGrade.destroy({ where: { subject_id } })
        return res.status(200).json({ sucess: 'Nota deletada com sucesso!'})
    }
}