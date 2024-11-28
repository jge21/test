<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store";
import defaultSettings from "@/settings";
import { ThemeEnum } from "@/enums/ThemeEnum";
import { SizeEnum } from "@/enums/SizeEnum";

const appStore = useAppStore();

const locale = computed(() => appStore.locale);
</script>
