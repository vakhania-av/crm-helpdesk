import type { ITicket } from '@/types/ticket'

const api = import.meta.env.VITE_API_BASE_URL || '/api'

export const ticketApi = {
  async create(ticket: Omit<ITicket, 'id' | 'createdAt'>): Promise<ITicket> {
    try {
      const response = await fetch(`${api}/tickets`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(ticket),
      })

      if (response.ok) {
        const result = await response.json()

        return result
      }

      throw new Error(`An error occured while creating a new ticket: status ${response.status}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create a new ticket!'

      throw new Error(errorMessage)
    }
  },

  async update(id: number, ticket: Partial<ITicket>): Promise<ITicket> {
    try {
      const response = await fetch(`${api}/tickets/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(ticket),
      })

      if (response.ok) {
        const result = await response.json()

        return result
      }

      throw new Error(`An error occured while editing current ticket: status ${response.status}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to edit the ticket!'

      throw new Error(errorMessage)
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await fetch(`${api}/tickets/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete the ticket!'

      throw new Error(errorMessage)
    }
  },

  async getAll(): Promise<ITicket[]> {
    try {
      const response = await fetch(`${api}/tickets`, {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const result = await response.json()

        return result
      }

      throw new Error(`An error occured while getting tickets: status ${response.status}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get tickets!'

      throw new Error(errorMessage)
    }
  },
}
