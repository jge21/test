<template>
  <div class="menu">
    <div class="list">
      <router-link
        v-for="(item, index) in props.menuList"
        :key="item.path"
        :to="item.path"
        class="item no-drag"
        :class="{ active: item.path === active }"
        @click="handelMenuPath(item.path)"
      >
        <img
          :src="item.path === active ? item.meta.activeIcon : item.meta.inactiveIcon"
          alt=""
          class="iconfont"
        />
        <span class="name">{{ item.meta.title }}</span>
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePermissionStore, useAppStore } from "@/store";
const appStore = useAppStore();

const props = defineProps({
  menuList: {
    type: Array<any>,
    required: true,
    default: () => [],
  },
  activePath: {
    type: String,
    required: true,
  },
});

// 监听父组件传过来的值
watch(
  () => props.activePath,
  (val) => {
    active.value = val;
  }
);

const active = ref(props.activePath); // 菜单选中状态
// 点击菜单
const handelMenuPath = (path: string) => {
  active.value = path;
};
</script>

<style lang="scss" scoped>
.menu {
  background-color: #f5f5f5;
  position: fixed;
  top: 110px;
  left: 0;
  bottom: 0;
  width: 150px;
  overflow-y: auto;
  z-index: 1000;
  // background-color: #fff;
}
.list {
  // margin: 26px 22px 0 12px;
  padding: 0 20px;
}
.item {
  display: block;
  // padding: 15px 12px;
  margin-bottom: 32px;
  box-sizing: content-box;
  font-size: 14px;
  // height: 16px;
  // line-height: 16px;
  border-radius: 9px;
  color: #707a8d;
  // &:hover {
  //   background-color: #eff7ff;
  // }
}
.iconfont {
  width: 16px;
  height: 16px;
  margin-right: 4px;
  vertical-align: text-bottom;
}
.active {
  // background-color: #d8ebff;
  font-weight: bold;
  color: #000;
}
</style>
