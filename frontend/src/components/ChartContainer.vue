<template>
  <div class="container">
    <line-chart v-if="loaded" :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import LineChart from "./Chart.vue";
import api from "../services/api";

export default {
  name: "LineChartContainer",
  components: { LineChart },
  data: () => ({
    loaded: false,
    chartdata: null,
  }),
  async mounted() {
    this.loaded = false;
    try {
      const { userlist } = await api.get('/students');
      this.chartdata = userlist;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
