<template>
  <v-dialog v-model="$store.state.addGradeDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Adicionar Nota</span>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-menu bottom right offset-y>
            <template v-slot:activator="{}">
              <v-btn dark small color="primary" @click="showAddSubject()">
                <span>Matéria</span>
              </v-btn>
            </template>
          </v-menu>
        </v-toolbar>
      </v-card-title>

      <v-card-text>
        <v-container>
          <template>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="$store.state.addGrade.subject"
                  :items="$store.state.subjects"
                  label="Matéria"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="$store.state.addGrade.grade"
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
        <v-btn
          color="gray darken-1"
          text
          @click="$store.state.addGradeDialog = false"
        >
          Fechar
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="addNewGrade($store.state.addGrade)"
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
    async addNewGrade(item) {
      this.$store.state.addGrade = Object.assign({}, item)
      console.log(item)
      await api.get(`/subjects/${item.subject}`).then(async (res) => {
        await api
          .post(`/students/${item.ra}/subject/${res.data.id}/grade`, {
            grade: item.grade,
          })
          .then((res) => {
            this.$store.state.grades.push(item)
            this.$store.state.addGradeDialog = false
            this.$store.dispatch('setSnack', {color: '#4caf50',res: res.data.success,})
          })
          .catch((err) => {
            if (err.response) {
              this.$store.dispatch('setSnack', {color: 'error',res: err.response.data.error})
            }
          })
      })
    },
    showAddSubject() {
      this.$store.state.addSubjectDialog = true
    },
  },
}
</script>
