// SLA конфигурация

import { SLA_HOURS } from '@/const'
import { type Priority, type Category } from '@/types/sla'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSlaStore = defineStore('sla', () => {
  // --- UI State (форма) ---
  const category = ref<Category | ''>('')
  const priority = ref<Priority | ''>('')

  // --- Вычисления ---
  const estimatedHours = computed(() => {
    if (!category.value || !priority.value) {
      return null
    }

    return SLA_HOURS[category.value]?.[priority.value] ?? null
  })

  const dueDate = computed(() => {
    const hours = estimatedHours.value

    if (hours === null) {
      return null
    }

    const now = new Date()
    const due = new Date(now.getTime() + hours * 60 * 60 * 1000)

    // Пропускаем выходные (простая логика: если суббота/воскресенье - переносим на понедельник)
    while (due.getDay() === 0 || due.getDay() === 6) {
      due.setDate(due.getDate() + 1)
    }

    return due
  })

  const formattedDueDate = computed(() => {
    return dueDate.value?.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  })

  // --- Валидация ---
  const isCategoryValid = computed(() => category.value !== '')

  const isPriorityValid = computed(() => priority.value !== '')

  const isFormValid = computed(() => isCategoryValid.value && isPriorityValid.value)

  // --- Управление ---
  const resetForm = () => {
    category.value = ''
    priority.value = ''
  }

  // --- Экспортируем данные для шаблона ---
  return {
    // Состояние
    category,
    priority,
    // Вычисления
    estimatedHours,
    formattedDueDate,
    // Валидация
    isCategoryValid,
    isPriorityValid,
    isFormValid,
    // Методы
    resetForm,
  }
})
