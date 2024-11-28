import { type RouteRecordRaw } from "vue-router";
export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const goods: RouteRecordRaw[] = [
  {
    path: "/goods",
    name: "goods",
    component: Layout,
    redirect: "/goods",
    meta: {
      title: "商品管理",
      activeIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732688865951.png",
      inactiveIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732688831056.png",
    },
    children: [
      {
        path: "/goods",
        component: () => import("@/views/goods/goodsList/index.vue"),
        name: "goodsList",
        meta: {
          title: "商品列表",
          activeIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732688797352.png",
          inactiveIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732688813620.png",
        },
      },
    ],
  },
];
