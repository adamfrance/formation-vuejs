import { defineStore } from "pinia";

const defaultTasks = [
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
];

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: structuredClone(defaultTasks),
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
  persist: { pick: ["tasks"] },
});
