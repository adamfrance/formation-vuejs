<script setup>
import TaskList from "../components/tasks/TaskList.vue";
import TaskForm from "../components/tasks/TaskForm.vue";
import TaskFilter from "../components/tasks/TaskFilter.vue";
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/taskStore.js";

const store = useTaskStore();
// state et getters
const { tasks, priorityFilter, filteredTasks, doneCount } = storeToRefs(store);
// actions
const { addTask, removeTask, toggleTask } = store;

const appTitle = "DevBoard";
</script>

<template>
  <section class="view">
    <h1>{{ appTitle }}</h1>
    <h2>Tableau de bord</h2>
    <TaskForm @add-task="addTask" />
    <div class="toolbar">
      <!-- V-model de composant -->
      <TaskFilter v-model="priorityFilter" />
      <span class="stats"
        >{{ doneCount }} terminée(s) sur {{ tasks.length }}</span
      >
    </div>
    <TaskList
      v-if="filteredTasks.length > 0"
      :tasks="filteredTasks"
      @delete-task="removeTask"
      @toggle-task="toggleTask"
    />
    <p v-else class="empty">Aucune tâche pour ce filtre.</p>
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
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.stats {
  color: var(--muted);
}
.empty {
  color: var(--muted);
  font-style: italic;
}
</style>
