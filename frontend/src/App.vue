<template>
  <v-app id="inspire">
    <v-snackbar
      v-model="snack.snackbar"
      :color="snack.color"
    >
      {{ snack.res }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snack.snackbar = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <img src="./assets/logo.png" />
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <StudentTable />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import StudentTable from '@/components/StudentTable.vue'
import { mapState } from 'vuex'
export default {
  components: {
    StudentTable,
  },
  computed: {
    ...mapState(['snack']),
  },
  data: () => ({
    cards: ['Students'],
    drawer: null,
    links: [['mdi-account-multiple', 'Alunos']],
  }),
}
</script>
