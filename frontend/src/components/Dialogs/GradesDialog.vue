<template>
  <v-dialog v-model="$store.state.gradesDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Notas {{ $store.state.editedItem.name }}</span>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-menu bottom right offset-y>
            <template v-slot:activator="{}">
              <v-btn
                dark
                small
                color="primary"
                fab
                @click="showAddGrades($store.state.editedItem)"
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
                v-for="(item, i) in $store.state.grades.length"
                :key="i"
              >
                <v-expansion-panel-header>{{
                  $store.state.grades[i].subject
                }}</v-expansion-panel-header>
                <v-expansion-panel-content
                  ><br />
                  Nota:
                  <strong>{{ $store.state.grades[i].grade }}</strong>
                  <v-alert
                    dense
                    text
                    :type="
                      $store.state.grades[i].grade >= 5 ? 'success' : 'error'
                    "
                  >
                    Aluno
                    <strong
                      >{{
                        $store.state.grades[i].grade >= 5
                          ? "aprovado"
                          : "reprovado"
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
        <v-btn
          color="blue darken-1"
          text
          @click="$store.state.gradesDialog = false"
        >
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from '../../services/api'

export default {
  methods: {
    async showAddGrades(item) {
      this.$store.state.editedItem = Object.assign({}, item);
      this.$store.state.subjects = [];
      this.$store.state.addGradeDialog = true;
      await api.get("/subjects").then((res) => {
        res.data.map((x) => {
          this.$store.state.subjects.push(x.name);
          this.$store.state.addGrade.ra = this.$store.state.editedItem.ra;
        });
      });
      console.log(item);
    },
  },
};
</script>
