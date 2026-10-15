<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import BaseBadge from "../common/BaseBadge.vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete-task", "toggle-task"]);

const badgeType = computed(() => {
  if (props.task.priority === "Haute") return "danger";
  if (props.task.priority === "Moyenne") return "warning";
  return "success";
});

const onDelete = () => emit("delete-task", props.task.id);

const onToggle = () => emit("toggle-task", props.task.id);

onMounted(() => console.log(`[TaskCard] #${props.task.id} monté`));
onUnmounted(() => console.log(`[TaskCard] #${props.task.id} démonté`));
</script>

<template>
  <!-- Carte, classe si terminée -->
  <article class="task-card" :class="{ 'task-card--done': task.done }">
    <div class="task-card__head">
      <h3>{{ task.title }}</h3>
      <!-- Pastille : le texte passe dans le slot -->
      <BaseBadge :type="badgeType">{{ task.priority }}</BaseBadge>
    </div>
    <p v-if="task.description">{{ task.description }}</p>
    <div class="task-card__actions">
      <button @click="onToggle">
        {{ task.done ? "Rouvrir" : "Terminer" }}
      </button>
      <button @click="onDelete" class="danger">Supprimer</button>
      <RouterLink
        :to="{ name: 'task-detail', params: { id: task.id } }"
        class="link"
        >Détail</RouterLink
      >
    </div>
  </article>
</template>

<style scoped>
.task-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
}
.task-card__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.task-card h3 {
  font-size: 1.05rem;
}
.task-card p {
  color: var(--muted);
  margin-top: 0.4rem;
}
.task-card--done h3 {
  text-decoration: line-through;
  color: var(--muted);
}
.task-card__actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
.danger {
  border-color: var(--red);
  color: var(--red);
}
.link {
  color: var(--blue);
  margin-left: auto;
  text-decoration: none;
}
</style>
