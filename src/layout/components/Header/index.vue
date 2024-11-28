<template>
  <div class="header">
    <Logo />
    <Menu />
  </div>
</template>
<script lang="ts" setup>
import Logo from "../Logo/index.vue";
import Menu from "../Menu/index.vue";
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  height: 80px;
  position: fixed;
  background-color: #f5f5f5;
  top: 0;
  left: 0;
  right: 0;
  min-width: 1280px;
  z-index: 1001;
}
</style>
