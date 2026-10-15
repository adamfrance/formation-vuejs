<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const route = useRoute(); //lire la route actuelle
const router = useRouter(); // redirection
const auth = useAuthStore();

const username = ref("");
const isValid = computed(() => username.value.length >= 3);

const onLogin = () => {
  if (!isValid.value) return;
  auth.login(username.value);
  router.push(route.query.redirect || { name: "dashboard" });
};
</script>

<template>
  <!-- Conteneur -->
  <section class="view">
    <h2>Connexion</h2>
    <p>La page « Statistiques » est réservée aux utilisateurs connectés.</p>
    <form class="login" @submit.prevent="onLogin">
      <input
        v-model.trim="username"
        type="text"
        placeholder="Nom d'utilisateur (3 caractères minimum)"
        autocomplete="username"
      />
      <button type="submit" :disabled="!isValid">Se connecter</button>
    </form>
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
.view p {
  margin-bottom: 1rem;
}
.login {
  display: grid;
  gap: 0.5rem;
  max-width: 360px;
}
.login input {
  padding: 0.5rem;
  background: var(--card);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 6px;
}
</style>
