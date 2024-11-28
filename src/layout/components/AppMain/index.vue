<template>
  <section class="app-main" style="">
    <router-view />
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-left: 150px;
  margin-top: 80px;
  height: calc(100vh - 80px);
}
</style>
