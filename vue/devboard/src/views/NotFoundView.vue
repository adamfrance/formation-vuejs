<template>
  <section class="view">
    <h2>Page introuvable</h2>
    <p>L'adresse demandée n'existe pas</p>
    <RouterLink to="/" class="back">Retour à l'accueil</RouterLink>
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
  margin-bottom: 0.75rem;
}
.view p {
  margin-bottom: 1rem;
}
.back {
  color: var(--blue);
  text-decoration: none;
}
</style>
