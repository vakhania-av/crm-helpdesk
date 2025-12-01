<template>
  <div class="ticket-list">
    <div class="stats">
      <span>Новых: {{ newTicketsCount }}</span>
      <span>Срочных: {{ highPriorityCount }}</span>
    </div>
    <h1>Тикеты поддержки</h1>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="tickets.length === 0">Нет тикетов</div>
    <div v-else class="tickets">
      <div v-for="ticket in tickets" :key="ticket.id" class="ticket">
        <div class="ticket-header">
          <span class="ticket-id">#{{ ticket.id }}</span>
          <span class="ticket-priority" :class="`priority-${ticket.priority}`">
            {{ ticket.priority }}
          </span>
        </div>
        <h3>{{ ticket.title }}</h3>
        <p v-if="ticket.description" class="description">{{ ticket.description }}</p>
        <p class="ticket-status">{{ ticket.status }}</p>
        <time>{{ formatDate(ticket.createdAt) }}</time>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTicketStore } from '@/stores/tickets'
import { computed } from 'vue'

const store = useTicketStore()

// Делаем данные реактивными
const tickets = computed(() => store.tickets)
const loading = computed(() => store.loading)
const highPriorityCount = computed(() => store.highPriorityCount)
const newTicketsCount = computed(() => store.newTicketsCount)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('ru-RU')
}
</script>

<style scoped>
.ticket-list {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.stats {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  font-weight: bold;
  color: #555;
}

.tickets {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ticket {
  padding: 16px;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.ticket-id {
  font-weight: bold;
  color: #555;
}

.ticket-priority {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  text-transform: uppercase;
  color: white;
}

.priority-high {
  background: #e53935;
}

.priority-medium {
  background: #fb8c00;
}

.priority-low {
  background: #43a047;
}

.ticket-status {
  color: #666;
  font-style: italic;
  margin: 8px 0;
}
</style>
