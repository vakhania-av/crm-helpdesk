<template>
  <div class="ticket-form">
    <h2>Создать новый тикет</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Заголовок *</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          class="input"
          placeholder="Кратко опишите проблему"
          :class="{ error: errors.title }"
        />
        <span v-if="errors.title" class="error-text">{{ errors.title }}</span>
      </div>

      <div class="form-group">
        <label for="description">Описание</label>
        <textarea
          id="description"
          v-model="form.description"
          class="textarea"
          placeholder="Детали, шаги для воспроизведения..."
        >
        </textarea>
      </div>

      <div class="form-group">
        <label for="priority">Приоритет</label>
        <select id="priority" v-model="form.priority" class="select">
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
      </div>

      <button type="submit" class="btn" :disabled="isSubmitting">
        {{ isSubmitting ? 'Отправка' : 'Создать тикет' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useTicketStore } from '@/stores/tickets'
import { reactive, ref } from 'vue'

const store = useTicketStore()

const form = reactive({
  title: '',
  description: '',
  priority: 'medium' as 'low' | 'medium' | 'high',
})

const errors = reactive({
  title: '',
})

const isSubmitting = ref(false)

const validate = () => {
  errors.title = ''

  if (!form.title.trim()) {
    errors.title = 'Заголовок обязателен!'

    return false
  }

  return true
}

const handleSubmit = () => {
  if (!validate) {
    return
  }

  isSubmitting.value = true

  // Имитируем задержку (позже заменим на API-запрос)
  setTimeout(() => {
    store.addTicket({
      title: form.title,
      description: form.description,
      priority: form.priority,
      status: 'new',
    })

    // Сброс формы
    form.title = ''
    form.description = ''
    form.priority = 'medium'
    isSubmitting.value = false
  }, 300)
}
</script>

<script lang="ts">
export default { name: 'TicketForm' }
</script>

<style scoped>
.ticket-form {
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
  max-width: 600px;
}

.form-group {
  margin-bottom: 16px;
}

.label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #333;
}

.input,
.textarea,
.select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.textarea {
  min-height: 100px;
  resize: vertical;
}

.error {
  border-color: #e53935 !important;
}

.error-text {
  background: #e53935;
  font-size: 14px;
  margin-top: 4px;
  display: block;
}

.btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn:disabled {
  background: #aaa;
  cursor: not-allowed;
}
</style>
