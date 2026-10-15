import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";

const routes = [
  { path: "/", name: "dashboard", component: DashboardView },
  {
    path: "/analytics",
    name: "analytics",
    component: () => import("../views/AnalyticsView.vue"),
  },
  {
    path: "/task/:id",
    name: "task-detail",
    component: () => import("../views/TaskDetailView.vue"),
    props: (route) => ({ id: Number(route.params.id) }),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
