<template>
  <nav class="navbar">
    <div class="logo">Helpdesk</div>
    <div class="nav-toggle" @click="navbarStore.toggleMenu" v-if="navbarStore.isMobile">☰</div>
    <div :class="['nav-links', { 'mobile-open': navbarStore.menuOpen }]">
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/dashboard" class="nav-link">Аналитика</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useNavbarStore } from '@/stores/navbar'
import { onMounted, onUnmounted } from 'vue'

const navbarStore = useNavbarStore()

onMounted(() => {
  window.addEventListener('resize', navbarStore.handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', navbarStore.handleResize)
})
</script>

<style scoped>
.navbar {
  background: #1976d2;
  padding: 0 20px;
  height: 56px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.nav-toggle {
  display: none;
  color: white;
  font-size: 24px;
  margin-left: auto;
  cursor: pointer;
}

.nav-links {
  display: flex;
  margin-left: 32px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-right: 12px;
  font-weight: 500;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  background: rgba(255, 255, 255, 0.2);
}

/* Mobile */
@media (max-width: 768px) {
  .nav-toggle {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    background: #1976d2;
    flex-direction: column;
    display: none;
    padding: 12px 0;
  }

  .nav-links.mobile-open {
    display: flex;
  }

  .nav-link {
    margin: 4px;
    width: calc(100% - 40px);
    text-align: center;
  }
}
</style>
