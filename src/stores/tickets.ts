import type { ITicket } from '@/types/ticket'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTicketStore = defineStore('tickets', () => {
  // Состояние
  const tickets = ref<ITicket[]>([
    {
      id: 1,
      title: 'Не работает авторизация',
      description: 'После обновления не могу войти в систему',
      status: 'new',
      priority: 'high',
      createdAt: '2025-03-01T10:00:00Z',
    },
    {
      id: 2,
      title: 'Ошибка при загрузке файла',
      description: 'Прикрепление файлов приводит к 500 ошибке',
      status: 'in_progress',
      priority: 'medium',
      createdAt: '2025-03-02T14:30:12Z',
    },
  ])

  const loading = ref(false)

  // Геттеры
  const highPriorityCount = computed(
    () => tickets.value.filter((t) => t.priority === 'high').length,
  )

  const newTicketsCount = computed(() => tickets.value.filter((t) => t.status === 'new').length)

  // Методы
  const addTicket = (ticket: Omit<ITicket, 'id' | 'createdAt'>) => {
    const newTicket: ITicket = {
      ...ticket,
      id: Math.max(0, ...tickets.value.map((t) => t.id)) + 1,
      createdAt: new Date().toISOString(),
    }

    tickets.value.push(newTicket)
  }

  // Позже сюда добавим fetchTickets(), updateTicket(), deleteTicket()

  return {
    tickets,
    loading,
    highPriorityCount,
    newTicketsCount,
    addTicket,
  }
})
