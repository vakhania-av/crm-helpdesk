<template>
  <div class="chart-container" v-if="chartStore.barChartData.datasets[0]?.data.some((d) => d > 0)">
    <h3>Тикеты по статусу</h3>
    <Bar :data="chartStore.barChartData" :options="chartStore.barChartOptions" />
  </div>
  <div v-else>Нет данных для отображения</div>
</template>

<script setup lang="ts">
import { useChartStore } from '@/stores/chart'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartStore = useChartStore()
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}

@media (max-width: 768px) {
  .chart-container {
    height: 250px;
    margin-bottom: 16px;
  }
}
</style>
