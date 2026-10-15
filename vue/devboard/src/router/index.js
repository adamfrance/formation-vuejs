import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import { useAuthStore } from "../stores/authStore.js";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
    meta: { title: "Accueil" },
  },
  {
    path: "/analytics",
    name: "analytics",
    component: () => import("../views/AnalyticsView.vue"),
    meta: { title: "Statistiques", requiresAuth: true },
  },
  {
    path: "/task/:id",
    name: "task-detail",
    component: () => import("../views/TaskDetailView.vue"),
    props: (route) => ({ id: Number(route.params.id) }),
    beforeEnter: (to) => {
      if (to.name === "task-detail" && Number.isNaN(Number(to.params.id))) {
        return { name: "dashboard" };
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: { title: "Connexion" },
  },
  {
    path: "/help",
    component: () => import("../views/HelpView.vue"),
    meta: { title: "Aide" },
    children: [
      { path: "", redirect: { name: "help-usage" } },
      {
        path: "usage",
        name: "help-usage",
        component: () => import("../views/HelpUsageView.vue"),
      },
      {
        path: "about",
        name: "help-about",
        component: () => import("../views/HelpAboutView.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not found",
    component: () => import("../views/NotFoundView.vue"),
    meta: { title: "Page introuvable" }, //to.meta.title
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  document.title = `DevBoard - ${to.meta.title ?? ""}`;
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
  if (to.name === "task-detail" && Number.isNaN(Number(to.params.id))) {
    return { name: "dashboard" };
  }
});

export default router;
