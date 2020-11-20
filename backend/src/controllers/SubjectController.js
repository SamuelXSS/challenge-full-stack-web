const Subject = require('../models/Subject')
const Grade = require('../models/Grade')

module.exports = {

    async show(req, res){
        const { name } = req.params

        const subject = await Subject.findOne({ where: { name } })

        res.json(subject)
    },

    async index(req, res){
        const subjects = await Subject.findAll()

        res.json(subjects)
    },

    async store(req, res){
        const { name } = req.body

        const subject = await Subject.findOne({ where: { name } })

        if(subject){
            return res.status(400).json({ error: `A matéria ${name} já existe!` })
        }

        const createSubject = await Subject.create({
            name
        })

        return res.status(200).json({ success: 'Matéria criada com sucesso!', createSubject})
        
    },

    async update(req, res){
        const { subject_id } = req.params
        const { name } = req.body

        const subject = await Subject.findByPk(subject_id)
        if(!subject){
            return res.status(400).json({ error: 'Essa matéria não existe!' })
        } 
        const updateSubject = await subject.update({name}) 

        return res.status(200).json({ success: 'Matéria atualizada com sucesso!', updateSubject })

    },

    async destroy(req, res){
        const { subject_id } = req.params

        const subject = await Subject.findByPk(subject_id)
        const checkGrades = await Grade.findOne({ where: { subject_id } })

        if(!subject){
            return res.status(400).json({ error: 'Essa matéria não existe!' })
        }
        if(checkGrades){
            return res.status(401).json({ error: 'Você não pode excluir essa matéria pois há notas de alunos atribuídas à ela!' })
        }
        
        const deleteSubject = await subject.destroy() 

        return res.status(200).json({ success: 'Matéria excluída com sucesso!' })

    }
}