<template>
  <v-dialog v-model="$store.state.addSubjectDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Adicionar Matéria</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <template>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="$store.state.newSubject"
                  required
                  label="Matéria"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="gray darken-1"
          text
          @click="$store.state.addSubjectDialog = false"
        >
          Fechar
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="addNewSubject($store.state.newSubject)"
        >
          Adicionar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from '../../services/api'

export default {
  methods: {
    async addNewSubject(item) {
      await api
        .post(`/subjects`, {
          name: item,
        })
        .then((res) => {
          this.$store.state.addSubjectDialog = false
          this.$store.state.subjects.push(item)
          this.$store.dispatch('setSnack', {color: 'success',res: res.data.success})
        })
        .catch((err) => {
          if (err.response) {
            this.$store.dispatch('setSnack', {color: 'error',res: err.response.data.error})
          }
        })
    },
  },
}
</script>
