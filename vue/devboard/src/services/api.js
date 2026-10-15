import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 3000,
});

apiClient.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.token) config.headers.Authorization = `Bearer ${auth.token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Erreur inattendue";
    if (error.code === "ECONNABORTED")
      message = "Le serveur met trop de temps à répondre";
    else if (!error.response) message = "Serveur injoignable";
    else if (
      error.config?.url === "/auth/login" &&
      [400, 401].includes(error.response.status)
    )
      message = "Identifiant ou mot de passe incorrect";
    else if (error.response.status === 401) {
      // Jeton expiré ou refusé : on déconnecte
      message = "Session expirée, reconnectez-vous";
      useAuthStore().logout();
    } else if (error.response.status === 404)
      message = "Ressource introuvable (404)";
    else if (error.response.status >= 500)
      message = `Erreur du serveur (${error.response.status})`;
    const failure = new Error(message);
    failure.status = error.response?.status;
    return Promise.reject(failure);
  },
);

const PRIORITIES = ["Haute", "Moyenne", "Basse"];

//Adaptateur : forme de l'api --> forme de notre application
const fromApi = (t) => ({
  id: t.id,
  title: t.todo,
  userId: t.userId,
  priority: PRIORITIES[t.id % 3],
  description: `Tache n°${t.id} (utilisateur ${t.userId})`,
});

//READ
const getTasks = async () => {
  const { data } = await apiClient.get("/todos", {
    params: { limit: 15, delay: 600 },
  });
  return data.todos.map(fromApi);
};

//CREATE
const createTask = async (task) => {
  const { data } = await apiClient.post("/todos/add", {
    todo: task.title,
    completed: false,
    userId: task.userId ?? 1,
  });
  return fromApi(data);
};

// UPDATE partiel
const updateTask = async (id, changes) => {
  const body = {};
  if ("done" in changes) body.completed = changes.done;
  if ("title" in changes) body.todo = changes.title;
  const { data } = await apiClient.patch(`/todos/${id}`, body);
  return fromApi(data);
};
// DELETE
const deleteTask = async (id) => {
  await apiClient.delete(`/todos/${id}`);
};

const login = async (username, password) => {
  const { data } = await apiClient.post('/auth/login', { username, password, expiresInMins: 60 })
  return data
}

export default { getTasks, createTask, updateTask, deleteTask, login };
