<template>
  <v-data-table
    :headers="headers"
    :items="$store.state.students"
    :search="$store.state.search"
    :footer-props="{ 'items-per-page-text': 'Matrículas por página' }"
    sort-by="ra"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Lista de Alunos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="$store.state.search"
            append-icon="mdi-magnify"
            label="Pesquisar..."
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <StudentDialog />
        <GradesDialog />
        <AddGradeDialog />
        <AddSubjectDialog />
        <DeleteStutendDialog />
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon medium color="yellow" class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon medium color="blue" class="mr-2" @click="showGrades(item)">
        mdi-library
      </v-icon>
      <v-icon medium color="red" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Atualizar
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import api from "../services/api";

import StudentDialog from './Dialogs/StudentDialog'
import GradesDialog from './Dialogs/GradesDialog'
import AddGradeDialog from './Dialogs/AddGradeDialog'
import AddSubjectDialog from './Dialogs/AddSubjectDialog'
import DeleteStutendDialog from './Dialogs/DeleteStudentDialog'

export default {
  components: {
    StudentDialog,
    GradesDialog,
    AddGradeDialog,
    AddSubjectDialog,
    DeleteStutendDialog
  },
  data: () => ({
    headers: [
      {
        text: "Registro Acadêmico",
        align: "start",
        sortable: true,
        value: "ra",
      },
      { text: "Nome", value: "name" },
      { text: "CPF", value: "cpf" },
      { text: "Ações", value: "actions", sortable: false },
    ],
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      this.$store.state.students = [];
      await api.get("/students").then((res) => {
        res.data.map((x) => {
          this.$store.state.students.push({
            ra: x.id,
            name: x.name,
            email: x.email,
            cpf: x.cpf,
            locked: x.locked,
          });
        });
      });
    },

    editItem(item) {
      this.$store.state.editedIndex = this.$store.state.students.indexOf(item);
      this.$store.state.editedItem = Object.assign({}, item);
      this.$store.state.dialog = true;
    },

    async showGrades(item) {
      console.log(item);
      this.$store.state.gradesDialog = true;
      this.$store.state.editedItem = Object.assign({}, item);
      this.$store.state.grades = [];
      await api.get(`/students/${item.ra}/grade`).then((res) => {
        res.data.map((x) => {
          this.$store.state.grades.push({
            subject: x.subjects.name,
            grade: parseFloat(x.grade),
          });
        });
      });
    },

    deleteItem(item) {
      this.$store.state.editedIndex = this.$store.state.students.indexOf(item);
      this.$store.state.editedItem = Object.assign({}, item);
      this.$store.state.dialogDelete = true;
    },
  },
};
</script>
