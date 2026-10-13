<script>
import TaskCard from "./components/tasks/TaskCard.vue";
export default {
  name: "App",
  components: { TaskCard },
  data() {
    return {
      appTitle: "DevBoard",
      showPriority: true,
      tasks: [
        {
          id: 1,
          title: "Installer Vite",
          description: "Configurer l'environnement",
          priority: "Haute",
          done: true,
        },
        {
          id: 2,
          title: "Créer les composants",
          description: "Découper l'application",
          priority: "Moyenne",
          done: false,
        },
        {
          id: 3,
          title: "Configurer le routeur",
          description: "Prévu plus tard",
          priority: "Basse",
          done: false,
        },
      ],
    };
  },
  methods: {
    clearTasks() {
      this.tasks = [];
    },
    togglePriority() {
      this.showPriority = !this.showPriority;
    },
  },
};
</script>

<template>
  <main class="app">
    <h1 :title="'Application ' + appTitle">{{ appTitle }}</h1>
    <div v-if="tasks.length > 0" class="task-list">
      <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
    </div>
    <p v-else class="empty">Aucune tâche</p>
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
.task-list {
  display: grid;
  gap: 0.75rem;
}
.empty {
  color: var(--muted);
  font-style: italic;
}
</style>
