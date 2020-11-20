import Vue from 'vue'
import Vuex from 'vuex'
import {
    nameRules,
    emailRules,
    cpfRules,
    gradeRules
} from "./components/rules";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        nameRules,
        emailRules,
        cpfRules,
        gradeRules,
        search: "",
        dialog: false,
        switch1: Boolean,
        dialogDelete: false,
        gradesDialog: false,
        addGradeDialog: false,
        addSubjectDialog: false,
        students: [],
        grades: [],
        subjects: [],
        newSubject: "",
        editedIndex: -1,
        snack: {},
        editedItem: {
            ra: "",
            name: "",
            email: "",
            cpf: "",
            locked: "",
        },
        addGrade: {
            ra: "",
            grade: "",
            subject: "",
        },
    },

    mutations: {
        SET_SNACK(state, snackbar){
            state.snack = snackbar
        }
    },
    actions: {
        setSnack({commit}, snack){
            snack.snackbar = true
            commit('SET_SNACK', snack)
        },
    }
})