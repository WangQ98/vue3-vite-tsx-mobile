import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/home";
import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";

const basicRoutes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
