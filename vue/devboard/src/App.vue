<script>
import TaskCard from "./components/tasks/TaskCard.vue";
export default {
  name: "App",
  components: { TaskCard },
  data() {
    return {
      appTitle: "DevBoard",
      showPriority: true,
      theme: 'dark',
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
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      document.documentElement.dataset.theme = this.theme
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) task.done = !task.done
    }
  }
};
</script>

<template>
  <main class="app">
    <button
      class="theme"
      @click="toggleTheme"
      :title="'Passer en mode ' + (theme === 'dark' ? 'clair' : 'sombre')"
    >
      {{ theme === "dark" ? "☀️" : "🌙" }}
    </button>
    <h1 :title="'Application ' + appTitle">{{ appTitle }}</h1>
    <div v-if="tasks.length > 0" class="task-list">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @delete-task="removeTask"
        @toggle-task="toggleTask"
      />
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
.theme {
  float: right;
  font-size: 1.2rem;
}
</style>
