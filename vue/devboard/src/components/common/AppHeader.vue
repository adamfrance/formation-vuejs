<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useTaskStore } from "../../stores/taskStore";
import { useAuthStore } from "../../stores/authStore";
import { useRoute, useRouter } from "vue-router";

const { tasks } = storeToRefs(useTaskStore());

const auth = useAuthStore();
const { user, isLoggedIn } = storeToRefs(auth);
const route = useRoute();
const router = useRouter();

const onLogout = () => {
  auth.logout();
  if (route.meta.requiresAuth) router.push({ name: "dashboard" });
};

// Thème courant : 'dark' ou 'light'
const theme = ref("dark");
// Bascule jour / nuit
const toggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme.value;
};
</script>

<template>
  <header class="app-header">
    <nav class="nav">
      <RouterLink to="/">Tableau de bord</RouterLink>
      <RouterLink to="/analytics">Statistiques</RouterLink>
      <RouterLink to="/help">Aide</RouterLink>
      <span class="count">{{ tasks.length }} tâches</span>
      <template v-if="isLoggedIn">
        <span class="user">
          {{ user.username }}
        </span>
        <button @click="onLogout">Déconnexion</button>
      </template>
      <RouterLink v-else to="/login">Connexion</RouterLink>
      <button
        class="theme"
        @click="toggleTheme"
        :title="'Passer en mode ' + (theme === 'dark' ? 'clair' : 'sombre')"
      >
        {{ theme === "dark" ? "☀️" : "🌙" }}
      </button>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: var(--card);
  border-bottom: 1px solid var(--border);
}
.brand {
  color: var(--green);
  font-size: 1.2rem;
}
.nav {
  display: flex;
  gap: 0.75rem;
}
.nav a {
  color: var(--muted);
  text-decoration: none;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
}
.nav a.router-link-exact-active {
  color: var(--text);
  background: var(--border);
}
.theme {
  font-size: 1.1rem;
  padding: 0.2rem 0.5rem;
}
.count {
  color: var(--muted);
  font-size: 0.85rem;
}
</style>
