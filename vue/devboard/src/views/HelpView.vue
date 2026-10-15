<template>
  <section class="view">
    <h2>Aide</h2>
    <nav class="sub-nav">
      <RouterLink :to="{ name: 'help-usage' }">Utilisation</RouterLink>
      <RouterLink :to="{ name: 'help-about' }">A propos</RouterLink>
    </nav>
    <RouterView />
  </section>
</template>

<style scoped>
.view {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.view h2 {
  color: var(--green);
  margin-bottom: 1rem;
}
.sub-nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.sub-nav a {
  color: var(--blue);
  text-decoration: none;
}
.sub-nav a.router-link-exact-active {
  text-decoration: underline;
}
</style>
