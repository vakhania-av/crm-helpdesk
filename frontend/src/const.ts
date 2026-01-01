// Карта SLA: категория → приоритет → часы
export const SLA_HOURS = {
  auth: { high: 4, medium: 8, low: 24 },
  payment: { high: 2, medium: 12, low: 48 },
  data: { high: 8, medium: 24, low: 72 },
  ui: { high: 24, medium: 48, low: 120 },
  other: { high: 12, medium: 36, low: 96 },
} as const

export const categoryLabels = {
  auth: 'Авторизация и доступ',
  payment: 'Платежи и выставление счетов',
  data: 'Импорт/экспорт данных',
  ui: 'Интерфейс и отображение',
  other: 'Другое',
} as const

export const priorityLabels = {
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
} as const

export const ticketStatuses = {
  new: 'Новый',
  in_progress: 'В работе',
  resolved: 'Решён',
  closed: 'Закрыт',
} as const

export const filterStatuses = {
  all: 'Все',
  new: 'Новые',
  in_progress: 'В работе',
  resolved: 'Решён',
  closed: 'Закрыт',
} as const

export const filtersPriority = {
  all: 'Все',
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
} as const

export const DEFAULT_TIMEOUT = 300

export const DEFAULT_WINDOW_WIDTH = 768
