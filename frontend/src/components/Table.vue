<template>
  <v-data-table
    :headers="headers"
    :items="students"
    :search="search"
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
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar..."
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Cadastrar Aluno
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.name"
                      :rules="nameRules"
                      required
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.email"
                      :rules="emailRules"
                      required
                      label="E-mail"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.cpf"
                      :disabled="isDisabled"
                      label="CPF"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-switch
                      v-model="editedItem.locked"
                      inset
                      :label="
                        `Matrícula trancada? ${
                          editedItem.locked == false ? 'Não' : 'Sim'
                        }`
                      "
                      @click="
                        editedItem.locked == false
                          ? (switch1 = false)
                          : (switch1 = true)
                      "
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="save(editedItem)">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="gradesDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Notas {{ editedItem.name }}</span>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-menu bottom right offset-y>
                  <template v-slot:activator="{}">
                    <v-btn
                      dark
                      small
                      color="primary"
                      fab
                      @click="showAddGrades(editedItem)"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                </v-menu>
              </v-toolbar>
            </v-card-title>

            <v-card-text>
              <v-container>
                <template>
                  <v-expansion-panels focusable>
                    <v-expansion-panel
                      v-for="(item, i) in grades.length"
                      :key="i"
                    >
                      <v-expansion-panel-header>{{
                        grades[i].subject
                      }}</v-expansion-panel-header>
                      <v-expansion-panel-content
                        ><br />
                        Nota: <strong>{{ grades[i].grade }}</strong>
                        <v-alert
                          dense
                          text
                          :type="grades[i].grade >= 5 ? 'success' : 'error'"
                        >
                          Aluno
                          <strong
                            >{{
                              grades[i].grade >= 5 ? "aprovado" : "reprovado"
                            }}!</strong
                          >
                        </v-alert>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </template>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="gradesDialog = false">
                Fechar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="addGradeDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Adicionar nota</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <template>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-select v-model="addGrade.subject" :items="subjects" label="Matéria"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="addGrade.grade"
                        required
                        label="Nota"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </template>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="gray darken-1" text @click="addGradeDialog = false">
                Fechar
              </v-btn>
              <v-btn color="blue darken-1" text @click="addNewGrade">
                Adicionar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Deseja realmente excluir o cadastro?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                @click="deleteItemConfirm(editedItem)"
                >Excluir</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
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
export default {
  data: () => ({
    nameRules: [
      (v) => !!v || "Preencha o nome do Aluno",
      (v) => (v && v.length >= 8) || "Coloque nome e sobrenome",
    ],
    emailRules: [
      (v) => !!v || "Digite um email para o aluno",
      (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
    ],
    cpfRules: [
      (v) => !!v || "Digite um cpf",
      (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
    ],
    search: "",
    switch1: Boolean,
    dialog: false,
    studentStatus: "aprovado",
    dialogDelete: false,
    gradesDialog: false,
    addGradeDialog: false,
    headers: [
      {
        text: "Registro Acadêmico",
        align: "start",
        sortable: true,
        value: "ra",
      },
      { text: "", value: "grade" },
      { text: "Nome", value: "name" },
      { text: "CPF", value: "cpf" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    students: [],
    grades: [],
    subjects: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      cpf: "",
      ra: "",
      locked: "",
    },
    addGrade: {
      ra: "",
      grade: "",
      subject: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Aluno" : "Editar Aluno";
    },
    isDisabled() {
      return this.editedIndex === -1 ? false : true;
    },
  },

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
      this.students = [];
      await api.get("/students").then((res) => {
        res.data.map((x) => {
          this.students.push({
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
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async showGrades(item) {
      console.log(item);
      this.grades = [];
      await api.get(`/students/${item.ra}/grade`).then((res) => {
        res.data.map((x) => {
          this.grades.push({
            subject: x.subjects.name,
            grade: parseFloat(x.grade),
          });
        });
      });
      this.gradesDialog = true;
      console.log(item);
    },

    async showAddGrades(item){
      this.subjects = []
      this.addGradeDialog = true
      await api.get('/subjects').then(res => {
        res.data.map(x => { 
          this.subjects.push(x.name)
        })
      })
      console.log(item)
    },

    async addNewGrade(){
      console.log(this.addGrade)
    },

    deleteItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm(item) {
      this.students.splice(this.editedIndex, 1);
      this.closeDelete();
      await api.delete(`/students/${item.ra}`);
    },

    teste(event) {
      console.log(event);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save(item) {
      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.editedItem);
        await api.put(`/students/${item.ra}`, {
          name: item.name,
          email: item.email,
          locked: this.switch1,
        });
      } else {
        this.students.push(this.editedItem);
        await api.post(`/students`, {
          name: item.name,
          email: item.email,
          cpf: item.cpf,
          locked: this.switch1,
        });
        Location.reload();
      }
      this.close();
    },
  },
};
</script>
