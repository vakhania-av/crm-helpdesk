export interface ITicket {
  id: number
  title: string
  description?: string
  status: 'new' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
}
