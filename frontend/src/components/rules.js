export const nameRules = [
    (v) => !!v || 'Preencha o nome do Aluno',
    (v) => (v && v.length >= 8) || 'Coloque nome e sobrenome',
]
export const emailRules = [
    (v) => !!v || 'Digite um email para o aluno',
    (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
]
export const cpfRules = [
    (v) => !!v || 'Digite um cpf',
    (v) =>
    /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/.test(v) ||
    'CPF deve ser válido',
]
export const gradeRules = [
    (v) => !!v || 'Digite uma nota',
    (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
]