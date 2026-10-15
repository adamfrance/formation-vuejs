import { ref, computed, watch } from "vue";

const STORAGE_KEY = "devboard.tasks";

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

// Lit les tâches sauvegardées
const loadTasks = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : structuredClone(defaultTasks);
  } catch {
    return structuredClone(defaultTasks);
  }
};



export function useTasks() {
  // L'état
  const tasks = ref(loadTasks());
  const priorityFilter = ref("Toutes");
  // Les calculs
  const filteredTasks = computed(() => {
    if (priorityFilter.value === "Toutes") return tasks.value;
    return tasks.value.filter((t) => t.priority === priorityFilter.value);
  });
  // Les actions
  const addTask = (payload) => {
    tasks.value.push({ id: Date.now(), done: false, ...payload });
  };
  // Nombre de tâches terminées
  const doneCount = computed(() => tasks.value.filter((t) => t.done).length);
  // Suppression
  const removeTask = (id) => {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  };
  // Terminer / rouvrir
  const toggleTask = (id) => {
    const task = tasks.value.find((t) => t.id === id);
    if (task) task.done = !task.done;
  };
  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    },
    { deep: true },
  );
  return {
    tasks,
    priorityFilter,
    filteredTasks,
    doneCount,
    addTask,
    removeTask,
    toggleTask,
  };
}
