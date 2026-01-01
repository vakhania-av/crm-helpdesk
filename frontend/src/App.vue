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
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  line-height: 1.6;
}
#app {
  font-family: Arial, sans-serif;
  min-height: 100vh;
}

.main-content {
  padding: 20px;
}

@media (max-width: 768px) {
  .main-content {
    padding: 12px;
  }

  h1,
  h2,
  h3 {
    font-size: 1.5rem;
  }
}
</style>
