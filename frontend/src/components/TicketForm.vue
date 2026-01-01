<template>
  <div class="ticket-form">
    <h2>Создать новый тикет</h2>

    <!-- Категория -->
    <div class="form-group">
      <label for="category">Категория проблемы *</label>
      <select id="category" v-model="slaStore.category" class="input" :class="{ error: !slaStore.isCategoryValid }">
        <option value="">– Выберите –</option>
        <option v-for="(label, key) in categoryLabels" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
      <span v-if="!slaStore.isCategoryValid" class="error-text">Выберите категорию!</span>
    </div>

    <!-- Заголовок -->
    <div class="form-group">
      <label for="title">Заголовок *</label>
      <input id="title" v-model="form.title" type="text" class="input" placeholder="Кратко опишите проблему"
        :class="{ error: !isTitleValid }" />
      <span v-if="!isTitleValid" class="error-text">Заголовок обязателен!</span>
    </div>

    <!-- Описание -->
    <div class="form-group">
      <label for="description">Описание</label>
      <textarea id="description" v-model="form.description" class="textarea"
        placeholder="Детали, шаги для воспроизведения...">
      </textarea>
    </div>

    <!-- Приоритет -->
    <div class="form-group">
      <label for="priority">Приоритет *</label>
      <select id="priority" v-model="slaStore.priority" class="select" :class="{ error: !slaStore.isPriorityValid }">
        <option value="">- Выберите -</option>
        <option v-for="(label, key) in priorityLabels" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
      <span v-if="!slaStore.isPriorityValid" class="error-text">Выберите приоритет!</span>
    </div>

    <!-- SLA Preview -->
    <div v-if="slaStore.estimatedHours" class="sla-preview">
      <p>⏳ <strong>Ожидаемое время решения:</strong> {{ slaStore.estimatedHours }} ч</p>
      <p>📅 <strong>Примерная дата завершения:</strong> {{ slaStore.formattedDueDate }}</p>
    </div>

    <button type="submit" class="btn" :disabled="isSubmitting || !isFormValid" @click="handleSubmit">
      {{ isSubmitting ? 'Отправка' : 'Создать тикет' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { categoryLabels, priorityLabels } from '@/const'
import { useSlaStore } from '@/stores/slaStore'
import { useTicketStore } from '@/stores/tickets'
import { computed, reactive, ref } from 'vue'

const ticketStore = useTicketStore()
const slaStore = useSlaStore()

// Только заголовок и описание - всё остальное в SLA-сторе
const form = reactive({
  title: '',
  description: '',
})

const isSubmitting = ref(false)
const isTitleValid = computed(() => form.title.trim() !== '')
const isFormValid = computed(() => isTitleValid.value && slaStore.isFormValid)

const handleSubmit = () => {
  if (!isFormValid.value) {
    return
  }

  isSubmitting.value = true

  ticketStore.addTicket({
    title: form.title,
    description: form.description,
    status: 'new',
    priority: slaStore.priority,
    category: slaStore.category,
  })

  // Сброс формы
  form.title = ''
  form.description = ''

  slaStore.resetForm()

  isSubmitting.value = false
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

.sla-preview {
  margin: 16px 0;
  padding: 12px;
  background: #e3f2fd;
  border-left: 4px solid #1976d2;
  border-radius: 4px;
  font-size: 14px;
}

.error-text {
  color: #e53935;
  font-size: 14px;
  margin-top: 4px;
  display: block;
}

.error {
  border-color: #e53935 !important;
}

/* Mobile */

@media (max-width: 768px) {
  .ticket-form {
    padding: 16px;
    margin: 16px 0;
  }

  .form-group label {
    font-size: 14px;
  }

  .input,
  .textarea,
  .select {
    font-size: 16px;
    /* Предотвращает zoom на iOS */
    padding: 12px;
  }

  .textarea {
    min-height: 80px;
  }

  .btn {
    width: 100%;
    padding: 12px;
    font-size: 16px;
  }

  .sla-preview {
    font-size: 13px;
    padding: 10px;
  }
}
</style>
