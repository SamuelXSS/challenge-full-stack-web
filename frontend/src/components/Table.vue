<template>
  <v-data-table
    :headers="headers"
    :items="students"
    :search="search"
    sort-by="calories"
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
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Deseja realmente excluir o cadastro?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                @click="deleteItemConfirm(editedItem)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
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
    dialogDelete: false,
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
    students: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      cpf: "",
      ra: "",
      locked: "",
    },
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
