<template>
  <v-dialog v-model="$store.state.dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="headline"
        >Deseja realmente excluir o cadastro?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="deleteItemConfirm($store.state.editedItem)"
          >Excluir</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "../../services/api";

export default {
  methods: {
    closeDelete() {
      this.$store.state.dialogDelete = false;
      this.$nextTick(() => {
        this.$store.state.editedItem = Object.assign({}, this.defaultItem);
        this.$store.state.editedIndex = -1;
      });
    },
    async deleteItemConfirm(item) {
      await api
        .delete(`/students/${item.ra}`)
        .then((res) => {
          this.$store.state.students.splice(this.$store.state.editedIndex, 1);
          this.closeDelete();
          this.$store.dispatch("setSnack", {
            color: "success",
            res: res.data.success,
          });
        })
        .catch((err) => {
          if (err.response) {
            this.$store.dispatch("setSnack", {
              color: "error",
              res: err.response.data.error,
            });
          }
        });
    },
  },
};
</script>
