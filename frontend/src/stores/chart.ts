import type { ITicket } from '@/types/ticket'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChartStore = defineStore('chart', () => {
  const pieChartData = ref({
    labels: ['Высокий', 'Средний', 'Низкий'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#e53935', '#fb8c00', '#43a047'],
      },
    ],
  })

  const barChartData = ref({
    labels: ['Новые', 'В работе', 'Решён', 'Закрыт'],
    datasets: [
      {
        label: 'Количество тикетов',
        data: [0, 0, 0, 0],
        backgroundColor: ['#2196f3', '#ff9800', '#4caf50', '#9e9e9e'],
      },
    ],
  })

  const pieChartOptions = {
    responsive: true,
    mantainAspectRatio: false,
    plugins: {
      legend: {
        display: window.innerWidth > 600, // скрываем легенду на мобильных/планшетах
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: window.innerWidth > 600 ? 12 : 10,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: window.innerWidth > 600 ? 12 : 10,
          },
        },
      },
    },
  }

  const barChartOptions = {
    responsive: true,
    mantainAspectRatio: false,
    plugins: {
      legend: {
        display: window.innerWidth > 600,
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: window.innerWidth > 600 ? 12 : 10,
          },
          stepSize: 1,
        },
      },
      x: {
        ticks: {
          font: {
            size: window.innerWidth > 600 ? 12 : 10,
          },
        },
      },
    },
  }

  const updateFromTickets = (tickets: ITicket[]) => {
    if (!tickets || !Array.isArray(tickets)) {
      return
    }

    if (pieChartData.value.datasets[0]) {
      pieChartData.value.datasets[0].data = [
        tickets.filter((t) => t.priority === 'high').length,
        tickets.filter((t) => t.priority === 'medium').length,
        tickets.filter((t) => t.priority === 'low').length,
      ]
    }

    if (barChartData.value.datasets[0]) {
      barChartData.value.datasets[0].data = [
        tickets.filter((t) => t.status === 'new').length,
        tickets.filter((t) => t.status === 'in_progress').length,
        tickets.filter((t) => t.status === 'resolved').length,
        tickets.filter((t) => t.status === 'closed').length,
      ]
    }
  }

  return {
    pieChartData,
    barChartData,
    pieChartOptions,
    barChartOptions,
    updateFromTickets,
  }
})
