<template>
  <nav class="navbar">
    <router-link to="/" class="nav-link"> Главная </router-link>
    <router-link to="/dashboard" class="nav-link"> Аналитика </router-link>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped>
.navbar {
  background: #1976d2;
  padding: 0 20px;
  height: 56px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-right: 16px;
  font-weight: 500;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  background: rgba(255, 255, 255, 0.2);
}
</style>
