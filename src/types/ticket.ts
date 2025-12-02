import type { categoryLabels, priorityLabels } from '@/const'

export interface ITicket {
  id: number
  title: string
  description?: string
  status: 'new' | 'in_progress' | 'resolved' | 'closed'
  priority: keyof typeof priorityLabels | ''
  category?: keyof typeof categoryLabels | ''
  createdAt: string
}
