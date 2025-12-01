import TicketList from '@/components/TicketList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [{ path: '/', component: TicketList }]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
