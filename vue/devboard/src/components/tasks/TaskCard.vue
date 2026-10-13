<script>
import BaseBadge from "../common/BaseBadge.vue";

export default {
  name: "TaskCard",
  // Déclare BaseBadge utilisable dans le template
  components: { BaseBadge },
  // Données reçues
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  emits: ["delete-task", "toggle-task"],
  // Valeurs calculées
  computed: {
    // Type de pastille selon la priorité
    badgeType() {
      if (this.task.priority === "Haute") return "danger";
      if (this.task.priority === "Moyenne") return "warning";
      return "success";
    },
  },
  methods: {
    onDelete() {
      this.$emit("delete-task", this.task.id);
    },
    onToggle() {
      this.$emit("toggle-task", this.task.id);
    },
  },
};
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
</style>
