import { type RouteRecordRaw } from "vue-router";
export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const order: RouteRecordRaw[] = [
  {
    path: "/order",
    name: "order",
    component: Layout,
    redirect: "/order",
    meta: {
      title: "订单管理",
      activeIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732688797352.png",
      inactiveIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732688813620.png",
    },
    children: [
      {
        path: "/order",
        component: () => import("@/views/order/pendingOrder/index.vue"),
        name: "pendingOrder",
        meta: {
          title: "待发货订单",
          activeIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732689760966.png",
          inactiveIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732689778877.png",
        },
      },
      {
        path: "/ziyou",
        component: () => import("@/views/order/ziyou/index.vue"),
        name: "ziyou",
        meta: {
          title: "自由打单",
          activeIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732689069593.png",
          inactiveIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732689095356.png",
        },
      },
      {
        path: "/allOrder",
        component: () => import("@/views/order/allOrder/index.vue"),
        name: "allOrder",
        meta: {
          title: "全部订单",
          activeIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732690271076.png",
          inactiveIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732690293881.png",
        },
      },
      {
        path: "/record",
        component: () => import("@/views/order/record/index.vue"),
        name: "record",
        meta: {
          title: "打单记录",
          activeIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732689801438.png",
          inactiveIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732689813908.png",
        },
      },
      {
        path: "/addresser",
        component: () => import("@/views/order/addresser/index.vue"),
        name: "addresser",
        meta: {
          title: "发件人管理",
          activeIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732690310717.png",
          inactiveIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732690323103.png",
        },
      },
      {
        path: "/documentaryAccount",
        component: () => import("@/views/order/documentaryAccount/index.vue"),
        name: "documentaryAccount",
        meta: {
          title: "电子面单账户",
          activeIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732689716350.png",
          inactiveIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732689731641.png",
        },
      },
      {
        path: "/expressTemplate",
        component: () => import("@/views/order/expressTemplate/index.vue"),
        name: "expressTemplate",
        meta: {
          title: "快递单模板",
          activeIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732690227928.png",
          inactiveIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732690240928.png",
        },
      },
      {
        path: "/invoiceTemplate",
        component: () => import("@/views/order/invoiceTemplate/index.vue"),
        name: "invoiceTemplate",
        meta: {
          title: "发货单模板",
          activeIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732689674542.png",
          inactiveIcon: "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/1732689693584.png",
        },
      },
    ],
  },
];
