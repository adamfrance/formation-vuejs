<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useTasks } from "../composables/useTasks";

const props = defineProps({
  id: { type: Number, required: true },
});

const router = useRouter();
const { tasks, toggleTask, removeTask } = useTasks();

const task = computed(() => tasks.value.find((t) => t.id === props.id));

const onDelete = () => {
  removeTask(props.id);
  router.push({ name: "dashboard" });
};
</script>

<template>
  <!-- Conteneur -->
  <section class="view">
    <div v-if="task">
      <h2>{{ task.title }}</h2>
      <p>Priorité : {{ task.priority }} - Statut : {{ task.done ? 'Terminée' : 'En cours' }}</p>
      <p>{{ task.description || 'Pas de description.' }}</p>
      <div class="actions">
        <button @click="toggleTask(task.id)">{{ task.done ? 'Rouvrir' : 'Terminer' }}</button>
        <button class="danger" @click="onDelete">Supprimer</button>
      </div>
    </div>
    <div v-else>
      <h2>Tâche introuvable</h2>
      <p>Aucune tâche ne porte le numéro {{ id }}.</p>
    </div>
    <!-- Lien de retour -->
    <RouterLink to="/" class="back">Retour au tableau de bord</RouterLink>
  </section>
</template>

<style scoped>
.view { max-width: 760px; margin: 0 auto; padding: 2rem 1rem; }
.view h2 { color: var(--green); margin-bottom: 0.75rem; }
.view p { margin-bottom: 0.5rem; }
.actions { display: flex; gap: 0.5rem; margin: 1rem 0; }
.danger { border-color: var(--red); color: var(--red); }
.back { color: var(--blue); text-decoration: none; }
</style>