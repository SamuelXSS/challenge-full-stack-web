<template>
  <v-dialog v-model="$store.state.dialog" max-width="500px">
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
                v-model="$store.state.editedItem.name"
                :rules="$store.state.nameRules"
                required
                label="Nome"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="$store.state.editedItem.email"
                :rules="$store.state.emailRules"
                required
                label="E-mail"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="$store.state.editedItem.cpf"
                :disabled="isDisabled"
                :rules="$store.state.cpfRules"
                label="CPF"
                maxLength="11"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-switch
                v-model="$store.state.editedItem.locked"
                inset
                :label="
                  `Matrícula trancada? ${
                    $store.state.editedItem.locked == false ? 'Não' : 'Sim'
                  }`
                "
                @click="
                  $store.state.editedItem.locked == false
                    ? ($store.state.switch1 = false)
                    : ($store.state.switch1 = true)
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
        <v-btn
          color="blue darken-1"
          text
          @click="save($store.state.editedItem)"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from '../../services/api'

export default {
  computed: {
    isDisabled() {
      return this.$store.state.editedIndex === -1 ? false : true
    },
    formTitle() {
      return this.$store.state.editedIndex === -1
        ? 'Novo Aluno'
        : 'Editar Aluno'
    },
  },
  methods: {
    close() {
      this.$store.state.dialog = false
      this.$nextTick(() => {
        this.$store.state.editedItem = Object.assign({}, this.defaultItem)
        this.$store.state.editedIndex = -1
      })
    },
    async save(item) {
      if (this.$store.state.editedIndex > -1) {
        Object.assign(
          this.$store.state.students[this.$store.state.editedIndex],
          this.$store.state.editedItem
        )
        await api
          .put(`/students/${item.ra}`, {
            name: item.name,
            email: item.email,
            locked: this.$store.state.switch1,
          })
          .then((res) => {
            this.close()
            this.$store.dispatch('setSnack', {color: 'success',res: res.data.success})
          })
          .catch((err) => {
            if (err.response) {
              this.$store.dispatch('setSnack', {color: 'error',res: err.response.data.error})
            }
          })
      } else {
        await api
          .post(`/students`, {
            name: item.name,
            email: item.email,
            cpf: item.cpf,
            locked: this.$store.state.switch1,
          })
          .then(() => {
            document.location.reload(true)
          })
          .catch((err) => {
            if (err.response) {
              this.$store.dispatch('setSnack', {color: 'error',res: err.response.data.error})
            }
          })
      }
    },
  },
}
</script>
