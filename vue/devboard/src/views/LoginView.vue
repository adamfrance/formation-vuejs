<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { storeToRefs } from "pinia";

const route = useRoute(); //lire la route actuelle
const router = useRouter(); // redirection
const auth = useAuthStore();
const { loading, error } = storeToRefs(auth);

const username = ref("");
const password = ref("");
const isValid = computed(
  () => username.value.length >= 3 && password.value.length >= 3,
);

const onLogin = async () => {
  if (!isValid.value) return;
  const ok = await auth.login(username.value, password.value);
  password.value = "";
  if (ok) router.push(route.query.redirect || { name: "dashboard" });
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
        placeholder="Nom d'utilisateur"
        autocomplete="username"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        autocomplete="current-password"
      />
      <button type="submit" :disabled="!isValid || loading">
        {{ loading ? "Connexion..." : "Se connecter" }}
      </button>
    </form>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <p class="hint">Compte de test DummyJSON : emilys / emilyspass</p>
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
.error {
  color: var(--red);
}
.hint {
  color: var(--muted);
  font-size: 0.9rem;
}
</style>
