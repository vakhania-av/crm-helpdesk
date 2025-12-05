<template>
  <div class="dashboard">
    <h1>Аналитика поддержки</h1>
    <div class="charts">
      <PriorityChart />
      <StatusChart />
    </div>
    <div class="stats">
      <div class="stat-card">
        <h4>Всего тикетов</h4>
        <p>{{ ticketStore.tickets.length }}</p>
      </div>
      <div class="stat-card">
        <h4>Новых</h4>
        <p>{{ newCount }}</p>
      </div>
      <div class="stat-card">
        <h4>Срочных (High)</h4>
        <p>{{ highCount }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTicketStore } from '@/stores/tickets'
import PriorityChart from './PriorityChart.vue'
import StatusChart from './StatusChart.vue'
import { computed, onMounted } from 'vue'
import { useChartStore } from '@/stores/chart'

const ticketStore = useTicketStore()
const chartStore = useChartStore()

onMounted(async () => {
  await ticketStore.loadTickets()
  chartStore.updateFromTickets(ticketStore.tickets)
})

const newCount = computed(() => ticketStore.tickets.filter((t) => t.status === 'new').length)
const highCount = computed(() => ticketStore.tickets.filter((t) => t.priority === 'high').length)
</script>

<style scoped>
.dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 60px;
}

.stats {
  display: flex;
  gap: 20px;
}

.stat-card {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
}

.stat-card h4 {
  margin: 0 0 10px;
  color: #555;
}

.stat-card p {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #1976d2;
}
</style>
