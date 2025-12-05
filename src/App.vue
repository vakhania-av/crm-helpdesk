<template>
  <div id="app">
    <AppNavbar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  min-height: 100vh;
}

.main-content {
  padding: 20px;
}
</style>
