import { ticketApi } from '@/api/ticketApi'
import type { ITicket } from '@/types/ticket'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTicketStore = defineStore('tickets', () => {
  // Состояние
  const tickets = ref<ITicket[]>([])
  const loading = ref(false)
  const actionType = ref('Обработка...')
  const loadingAction = ref(false) // отдельный для мутаций (создание/обновление/удаление)
  const editingTicket = ref<ITicket | null>(null)
  // Фильтрация + Поиск
  const filterStatus = ref<string>('all')
  const filterPriority = ref<string>('all')
  const searchTerm = ref<string>('') // поиск по заголовку/описанию

  // Геттеры
  const highPriorityCount = computed(
    () => tickets.value.filter((t) => t.priority === 'high').length,
  )

  const newTicketsCount = computed(() => tickets.value.filter((t) => t.status === 'new').length)

  // Вычисляемый список тикетов
  const filteredTickets = computed(() => {
    return tickets.value.filter((ticket) => {
      // Поиск
      const matchesSearch =
        !searchTerm.value.trim() ||
        ticket.title.toLowerCase().includes(searchTerm.value.trim().toLowerCase()) ||
        (ticket.description &&
          ticket.description.toLowerCase().includes(searchTerm.value.trim().toLowerCase()))

      // Статус
      const matchesStatus = filterStatus.value === 'all' || ticket.status === filterStatus.value

      // Приоритет
      const matchesPriority =
        filterPriority.value === 'all' || ticket.priority === filterPriority.value

      return matchesSearch && matchesStatus && matchesPriority
    })
  })

  const totalTickets = computed(() => tickets.value.length)
  const visibleTicketsCount = computed(() => filteredTickets.value.length)

  /*** Методы ***/
  const loadTickets = async () => {
    loading.value = true

    try {
      tickets.value = await ticketApi.getAll()
    } catch (err) {
      console.error('Failed to load tickets:', err)
      tickets.value = []
    } finally {
      loading.value = false
    }
  }

  const addTicket = async (ticket: Omit<ITicket, 'id' | 'createdAt'>) => {
    loadingAction.value = true
    actionType.value = 'Создание...'

    try {
      const savedTicket = await ticketApi.create(ticket)

      tickets.value.push(savedTicket)
    } catch (err) {
      console.error('Failed to create ticket:', err)
      throw err
    } finally {
      loadingAction.value = false
    }
  }

  const updateTicket = async (id: number, ticket: Partial<ITicket>) => {
    loadingAction.value = true
    actionType.value = 'Сохранение...'

    try {
      const updated = await ticketApi.update(id, ticket)
      const index = tickets.value.findIndex((t) => t.id === id)

      if (!!~index) {
        tickets.value[index] = updated
      }
    } catch (err) {
      console.error('Failed to update ticket:', err)
      throw err
    } finally {
      loadingAction.value = false
    }
  }

  const deleteTicket = async (id: number) => {
    if (!confirm('Удалить тикет? Это действие нельзя отменить.')) {
      return
    }

    loadingAction.value = true
    actionType.value = 'Удаление...'

    try {
      await ticketApi.delete(id)

      tickets.value = tickets.value.filter((t) => t.id !== id)
    } catch (err) {
      console.error('Failed to delete ticket:', err)
      throw err
    } finally {
      loadingAction.value = false
    }
  }

  const setFilterStatus = (status: string) => {
    filterStatus.value = status
  }

  const setFilterPriority = (priority: string) => {
    filterPriority.value = priority
  }

  const setSearchTerm = (term: string) => {
    searchTerm.value = term
  }

  const resetFilters = () => {
    filterStatus.value = 'all'
    filterPriority.value = 'all'
    searchTerm.value = ''
  }

  return {
    tickets,
    loading,
    loadingAction,
    actionType,
    editingTicket,
    highPriorityCount,
    newTicketsCount,
    filterStatus,
    filterPriority,
    totalTickets,
    filteredTickets,
    visibleTicketsCount,
    searchTerm,
    addTicket,
    loadTickets,
    updateTicket,
    deleteTicket,
    setFilterStatus,
    setFilterPriority,
    setSearchTerm,
    resetFilters,
  }
})
