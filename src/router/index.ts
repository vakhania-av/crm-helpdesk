import DashboardView from '@/components/DashboardView.vue'
import TicketList from '@/components/TicketList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: TicketList },
  { path: '/dashboard', component: DashboardView },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
