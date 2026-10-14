<script>
import TaskCard from "./components/tasks/TaskCard.vue";
import TaskForm from "./components/tasks/TaskForm.vue";
import TaskFilter from "./components/tasks/TaskFilter.vue";
import WatchExperience from "../../../exemples/WatchExperience.vue";

export default {
  name: "App",
  components: { TaskCard, TaskForm, TaskFilter },
  data() {
    return {
      appTitle: "DevBoard",
      showPriority: true,
      theme: "dark",
      priorityFilter: "Toutes",
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
      this.theme = this.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = this.theme;
    },
    removeTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
    toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.done = !task.done;
    },
    addTask(payload) {
      this.tasks.push({ id: Date.now(), done: false, ...payload });
    },
  },
  computed: {
    filteredTasks() {
      if (this.priorityFilter === "Toutes") return this.tasks;
      return this.tasks.filter((t) => t.priority === this.priorityFilter);
    },
    doneCount() {
      return this.tasks.filter((t) => t.done).length;
    },
  },
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
    <TaskForm @add-task="addTask" />
    <div class="toolbar">
      <TaskFilter v-model="priorityFilter" />
      <span>{{ doneCount }} terminée(s) sur {{ tasks.length }}</span>
    </div>
    <div v-if="filteredTasks.length > 0" class="task-list">
      <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @delete-task="removeTask"
        @toggle-task="toggleTask"
      />
    </div>
    <p v-else class="empty">Aucune tâche</p>
    <WatchExperience />
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
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
