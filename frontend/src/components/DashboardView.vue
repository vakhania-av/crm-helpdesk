<template>
  <div class="dashboard">
    <h1>Аналитика поддержки</h1>
    <div v-if="ticketStore.loading" class="spinner-overlay">
      <div class="spinner"></div>
    </div>
    <div v-else-if="ticketStore.tickets.length === 0">Нет тикетов</div>
    <div v-else class="charts">
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
.spinner-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  margin: 20px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 1px solid #f3f3f3;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.dashboard {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
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

/* Mobile */
@media (max-width: 768px) {
  .charts {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

/* Гарантируем, что график не вылезет за границы */
:deep(.chart-container canvas),
:deep(.chart-container svg) {
  max-width: 100%;
  display: block;
}
</style>
