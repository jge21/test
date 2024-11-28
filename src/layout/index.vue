<template>
  <Header />
  <Sidebar :menu-list="mixLeftMenus" :activePath="activePath" />
  <AppMain />
</template>

<script setup lang="ts">
import Header from "./components/Header/index.vue";
import Sidebar from "./components/Sidebar/index.vue";
import AppMain from "./components/AppMain/index.vue";

import { usePermissionStore, useAppStore } from "@/store";
const permissionStore = usePermissionStore();
const appStore = useAppStore();

const activeTopMenuPath = computed(() => appStore.activeTopMenuPath); // 顶部菜单激活path
const mixLeftMenus = computed(() => permissionStore.mixLeftMenus); // 混合布局左侧菜单

const activePath = ref();
watch(
  () => activeTopMenuPath.value,
  async (newVal: string) => {
    permissionStore.setMixLeftMenus(newVal);
    activePath.value = newVal;
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
