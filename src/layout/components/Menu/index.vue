<template>
  <ul class="menu-list ivu-menu ivu-menu-light ivu-menu-horizontal">
    <li
      v-for="(item, index) in menuList"
      :key="item.path"
      class="ivu-menu-item no-drag"
      :class="{ 'ivu-menu-item-active': item.path === active }"
      @click="handleMenuSelect(item)"
    >
      <img
        class="iconfont"
        :src="item.path === active ? item.meta.activeIcon : item.meta.inactiveIcon"
        alt=""
      />
      <span class="menu-list-item-name">{{ item.meta.title }}</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import router from "@/router";
import { usePermissionStore, useAppStore } from "@/store";
const permissionStore = usePermissionStore();
const appStore = useAppStore();

import { LocationQueryRaw, RouteRecordRaw } from "vue-router";

const menuList = ref([]);

const active = ref("");
const activeTopMenuPath = useStorage("activeTopMenuPath", "");

const handleMenuSelect = async (item) => {
  activeTopMenuPath.value = item.path; // 设置激活的顶部菜单
  permissionStore.setMixLeftMenus(item.path); // 更新左侧菜单
  navigateToFirstLeftMenu(permissionStore.mixLeftMenus); // 跳转到左侧第一个菜单
  getActivePath();
};
/**
 * 跳转到左侧第一个可访问的菜单
 * @param menus 左侧菜单列表
 */
const navigateToFirstLeftMenu = (menus: RouteRecordRaw[]) => {
  if (menus.length === 0) return;

  const [firstMenu] = menus;

  // 如果第一个菜单有子菜单，递归跳转到第一个子菜单
  if (firstMenu.children && firstMenu.children.length > 0) {
    navigateToFirstLeftMenu(firstMenu.children as RouteRecordRaw[]);
  } else if (firstMenu.name) {
    router.push({
      name: firstMenu.name,
      query:
        typeof firstMenu.meta?.params === "object"
          ? (firstMenu.meta.params as LocationQueryRaw)
          : undefined,
    });
  }
};

const getActivePath = () => {
  router.options.routes.forEach((item) => {
    if (item.path === activeTopMenuPath.value) {
      active.value = item.path;
    } else if (item.children) {
      const child = item.children.find((child) => child.path === activeTopMenuPath.value);
      if (child) {
        active.value = child.path;
      }
    }
  });
};

onMounted(async () => {
  menuList.value = router.options.routes.filter((item) => !item.meta || !item.meta.hidden);
  getActivePath();
});
</script>
<style lang="scss" scoped>
.menu-list {
  display: flex;
  // padding: 0 12px;
  height: 30px;
  margin-top: 40px !important;
}
.ivu-menu-light {
  background: #f5f5f5;
}

.ivu-menu-horizontal {
  line-height: 22px;
}
.ivu-menu {
  margin: 0;

  outline: 0;
  list-style: none;
  color: #515a6e;
  font-size: 14px;
  position: relative;
  z-index: 900;
}

.ivu-menu-item {
  display: block;
  outline: 0;
  list-style: none;
  position: relative;
  cursor: pointer;
  z-index: 3;
  margin: 0 12px;
  padding: 0 4px;
  font-size: 15px;
  height: inherit;
  line-height: inherit;
  color: #929292;
  &:hover {
    color: #000000;
    border-bottom: 2px solid #73d13d;
  }
}
.iconfont {
  width: 16px;
  height: 16px;
  margin-right: 4px;
  vertical-align: text-bottom;
}
// 激活
.ivu-menu-item-active {
  font-weight: 700;
  color: #000000;
  border-bottom: 2px solid #73d13d;
}
</style>
