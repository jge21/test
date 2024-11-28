<template>
  <div class="order-item-th" :style="{ width: columnWidth }">
    <div class="lable">{{ label }}</div>
    <div class="ccntent">
      <slot :order="order" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  order: {
    type: Object,
    required: true,
  },
  width: {
    type: String,
    default: "auto", // 默认宽度为自动
  },
});

// 计算列宽
const columnWidth = props.width;
</script>

<style scoped lang="scss">
.order-item-th {
  border-right: 1px solid #d8defe;
  font-size: 13px;
  .lable {
    background-color: #f9faff;
    height: 40px;
    line-height: 40px;
    padding-left: 14px;
  }
  .ccntent {
    height: 100%;
  }
}
</style>
