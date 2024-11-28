import type { App } from "vue";
import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { order } from "./order.ts";
import { goods } from "./goods.js";

export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)", // 捕获所有未匹配的路由
    component: () => import("@/views/error/404.vue"), // 404 组件
    meta: { hidden: true },
  },
  {
    path: "/transferPage",
    component: () => import("@/views/transferPage/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
  ...order,
  ...goods,
  // {
  //   path: "/",
  //   name: "/",
  //   component: Layout,
  //   redirect: "/dashboard",
  //   children: [
  //     {
  //       path: "dashboard",
  //       component: () => import("@/views/dashboard/index.vue"),
  //       name: "Dashboard",
  //       meta: {
  //         title: "dashboard",
  //         icon: "homepage",
  //         affix: true,
  //         keepAlive: true,
  //       },
  //     },
  //     {
  //       path: "401",
  //       component: () => import("@/views/error/401.vue"),
  //       meta: { hidden: true },
  //     },
  //     {
  //       path: "404",
  //       component: () => import("@/views/error/404.vue"),
  //       meta: { hidden: true },
  //     },
  //   ],
  // },
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 全局注册 router
export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
