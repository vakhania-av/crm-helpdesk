<template>
  <div class="chart-container" v-if="chartStore.pieChartData.datasets[0]?.data.some((d) => d > 0)">
    <h3>Тикеты по приоритету</h3>
    <Doughnut :data="chartStore.pieChartData" />
  </div>
  <div v-else>Нет данных для отображения</div>
</template>

<script setup lang="ts">
import { useChartStore } from '@/stores/chart'
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

const chartStore = useChartStore()
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}

@media (max-width: 768px) {
  .chart-container {
    height: 25opx;
    margin-bottom: 16px;
  }
}
</style>
