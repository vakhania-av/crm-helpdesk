<template>
  <div class="ticket-list">
    <div class="stats">
      <span>Новых: {{ newTicketsCount }}</span>
      <span>Срочных: {{ highPriorityCount }}</span>
    </div>

    <!-- Добавляем форму -->
    <TicketForm />

    <h1>Тикеты поддержки</h1>
    <div v-if="ticketStore.loading" class="spinner-overlay">
      <div class="spinner"></div>
    </div>
    <div v-else-if="ticketStore.loadingAction" class="spinner-inline">
      {{ ticketStore.actionType }}
    </div>
    <div v-else-if="tickets.length === 0">Нет тикетов</div>
    <!-- Панель фильтрации -->
    <div v-else class="tickets">
      <TicketFilterPanel />
      <div class="ticket-wrapper">
        <div v-for="(ticket) in ticketStore.filteredTickets" :key="ticket.id" class="ticket">
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

          <div class="ticket-actions">
            <button @click="startEdit(ticket)" class="btn btn-sm">✏️ Редактировать</button>
            <button @click="handleDelete(ticket.id)" class="btn btn-sm btn-danger">
              🗑️ Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <TicketEditForm v-if="ticketStore.editingTicket" :ticket="ticketStore.editingTicket" @save="handleSave"
    @cancel="ticketStore.editingTicket = null" />
</template>

<script setup lang="ts">
import { useTicketStore } from '@/stores/tickets'
import { computed, onMounted } from 'vue'
import TicketForm from './TicketForm.vue'
import type { ITicket } from '@/types/ticket'
import TicketEditForm from './TicketEditForm.vue'
import TicketFilterPanel from './TicketFilterPanel.vue'

const ticketStore = useTicketStore()

onMounted(() => {
  ticketStore.loadTickets()
})

// Делаем данные реактивными
const tickets = computed(() => ticketStore.tickets)
const highPriorityCount = computed(() => ticketStore.highPriorityCount)
const newTicketsCount = computed(() => ticketStore.newTicketsCount)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('ru-RU')
}

const startEdit = (ticket: ITicket) => {
  ticketStore.editingTicket = { ...ticket }
}

const handleSave = async (updates: Partial<ITicket>) => {
  if (ticketStore.editingTicket) {
    await ticketStore.updateTicket(ticketStore.editingTicket.id, updates)
    ticketStore.editingTicket = null
  }
}

const handleDelete = (id: number) => {
  ticketStore.deleteTicket(id)
}
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

.spinner-inline {
  text-align: center;
  padding: 16px;
  color: #1976d2;
  font-style: italic;
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

.ticket-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
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

.btn:hover {
  background: #ccc;
  transform: translateY(-2px);
}

.btn-sm {
  font-size: 14px;
}

.btn-danger {
  background: #e53935;
}

@media (max-width: 768px) {
  .ticket-wrapper {
    margin-bottom: 12px;
  }

  .ticket {
    padding: 12px;
    font-size: 14px;
  }

  .ticket-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .ticket-id,
  .ticket-priority {
    font-size: 12px;
  }

  .ticket-actions {
    flex-direction: column;
    gap: 6px;
  }

  .btn-sm {
    width: 100%;
    padding: 6px;
    font-size: 14px;
  }
}
</style>
