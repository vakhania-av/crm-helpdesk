import { DEFAULT_WINDOW_WIDTH } from '@/const'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavbarStore = defineStore('navbar', () => {
  const menuOpen = ref(false)
  const isMobile = ref(window.innerWidth < DEFAULT_WINDOW_WIDTH)

  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }

  const handleResize = () => {
    isMobile.value = window.innerWidth < DEFAULT_WINDOW_WIDTH

    if (!isMobile.value) {
      menuOpen.value = false
    }
  }

  return {
    menuOpen,
    isMobile,
    toggleMenu,
    handleResize,
  }
})
