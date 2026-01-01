<template>
  <div class="ticket-edit-form">
    <h3>Редактировать тикет</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Статус</label>
        <select v-model="form.status" class="select">
          <option v-for="(label, key) in ticketStatuses" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Приоритет</label>
        <select v-model="form.priority" class="select">
          <option v-for="(label, key) in priorityLabels" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Описание</label>
        <textarea v-model="form.description" class="textarea"></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn">Сохранить</button>
        <button type="button" class="btn btn-outline" @click="onCancel">Отмена</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { priorityLabels, ticketStatuses } from '@/const'
import type { ITicket } from '@/types/ticket'
import { reactive } from 'vue'

const props = defineProps<{ ticket: ITicket }>()

const emit = defineEmits<{
  (e: 'save', updates: Partial<ITicket>): void
  (e: 'cancel'): void
}>()

const form = reactive({
  status: props.ticket.status,
  priority: props.ticket.priority,
  description: props.ticket.description || '',
})
const handleSubmit = () => {
  emit('save', {
    status: form.status,
    priority: form.priority,
    description: form.description,
  })
}

const onCancel = () => {
  emit('cancel')
}
</script>

<script lang="ts">
export default { name: 'TicketEditForm' }
</script>

<style scoped>
.ticket-edit-form {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f9f9f9;
}

.form-group {
  margin-bottom: 12px;
}

.select,
.textarea {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-outline {
  background: transparent;
  color: #1976d2;
  border: 1px solid #1976d2;
  margin-left: 8px;
}
</style>
