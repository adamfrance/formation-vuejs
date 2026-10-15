<script setup>
import AppHeader from "./components/common/AppHeader.vue";
</script>

<template>
  <!-- Conteneur -->
  <main class="app">
    <AppHeader />
    <RouterView />
  </main>
</template>

<style scoped>
.app {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.app h1 {
  color: var(--green);
  margin-bottom: 1rem;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.stats {
  color: var(--muted);
}
.empty {
  color: var(--muted);
  font-style: italic;
}
.theme {
  float: right;
  font-size: 1.2rem;
}
</style>
