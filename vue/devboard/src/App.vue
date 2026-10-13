<script>
export default {
  name: "App",
  data() {
    return {
      appTitle: "DevBoard",
    };
  },
};
</script>

<template>
  <main class="app">
    <h1>{{ appTitle }}</h1>
    <p>Projet initialisé avec Vite et Vue3</p>
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
</style>
