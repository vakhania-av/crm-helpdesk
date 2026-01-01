<template>
  <!-- Панель фильтрации -->
  <div class="filters">
    <div class="filter-group">
      <label>Статус:</label>
      <select v-model="ticketStore.filterStatus">
        <option v-for="(label, key) in filterStatuses" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label>Приоритет:</label>
      <select v-model="ticketStore.filterPriority">
        <option v-for="(label, key) in filtersPriority" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label>Поиск:</label>
      <input
        id="search"
        type="text"
        v-model="ticketStore.searchTerm"
        placeholder="Заголовок или описание..."
        class="search-input"
      />
    </div>

    <button @click="ticketStore.resetFilters" class="btn btn-sm btn-outline">Сбросить</button>
  </div>

  <!-- Статистика -->
  <p class="filter-stats">
    Показано: {{ ticketStore.visibleTicketsCount }} из {{ ticketStore.totalTickets }} тикетов
  </p>
</template>

<script setup lang="ts">
import { filtersPriority, filterStatuses } from '@/const'
import { useTicketStore } from '@/stores/tickets'

const ticketStore = useTicketStore()
</script>

<script lang="ts">
export default { name: 'TicketFilterPanel' }
</script>

<style scoped>
.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: flex-start;
}

.search-input {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

.filter-stats {
  margin-bottom: 16px;
  color: #666;
  font-style: italic;
}

.btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s;
}

.btn-sm {
  font-size: 14px;
}

.btn-outline {
  background: transparent;
  color: #1976d2;
  border: 1px solid #1976d2;
}

.btn-outline:hover {
  background: aliceblue;
  transform: translateY(-2px);
}
</style>
