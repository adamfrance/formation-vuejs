import { defineStore } from "pinia";
import api from "../services/api";



export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    loading: false,
    loaded: false,
    error: "",
    priorityFilter: "Toutes",
  }),

  getters: {
    filteredTasks: (state) =>
      state.priorityFilter === "Toutes"
        ? state.tasks
        : state.tasks.filter((t) => t.priority === state.priorityFilter),
    doneCount: (state) => state.tasks.filter((t) => t.done).length,
    // Pourcentage de tâches terminées (page Statistiques)
    percentDone() {
      return this.tasks.length === 0
        ? 0
        : Math.round((this.doneCount / this.tasks.length) * 100);
    },
    // Nombre de tâches par priorité : { Haute: 1, Moyenne: 1, Basse: 1 }
    countsByPriority: (state) =>
      state.tasks.reduce((acc, t) => {
        acc[t.priority] = (acc[t.priority] ?? 0) + 1;
        return acc;
      }, {}),
  },

  actions: {
    async loadTasks({ force = false } = {}) {
      if (this.loading || (this.loaded && !force)) return;
      this.loading = true;
      this.error = "";
      try {
        this.tasks = await api.getTasks();
        this.loaded = true;
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
    addTask(payload) {
      this.tasks.push({ id: Date.now(), done: false, ...payload });
    },
    removeTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
    toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.done = !task.done;
    },
  },
  persist: { pick: ["priorityFilter"] },
});
