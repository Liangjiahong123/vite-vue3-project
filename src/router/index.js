import { createRouter, createWebHashHistory } from "vue-router";

// 基本路由
const baseRouter = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/index.vue")
  },
  // 兜底路由
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    component: () => import("@/views/NotFound/index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...baseRouter]
});

export default router;
