<!-- src/views/order/pendingOrder/components/OrderTable.vue -->
<template>
  <div class="table-container">
    <div class="order-idx-list">
      <div v-for="(order, index) in data" :key="index" class="order-item">
        <div class="order-item-content flex">
          <div class="order-item-th shang-pin">
            <div class="lable">商品</div>
            <div class="ccntent">
              <el-checkbox v-model="selectedOrders" :value="order.id" />
              <!-- 添加复选框 -->
              <slot name="item" :order="order" />
            </div>
          </div>
          <div class="order-item-th di-zhi">
            <div class="lable">地址</div>
            <div class="ccntent">
              <slot name="address" :order="order" />
            </div>
          </div>
          <div class="order-item-th bei-zhu">
            <div class="lable">备注</div>
            <div class="ccntent">
              <slot name="remark" :order="order" />
            </div>
          </div>
          <div class="order-item-th dan-hao">
            <div class="lable">快递单号</div>
            <div class="ccntent">
              <slot name="tracking-number" :order="order" />
            </div>
          </div>
          <div class="order-item-th cao-zuo">
            <div class="lable">操作</div>
            <div class="ccntent">
              <slot name="actions" :order="order" />
            </div>
          </div>
        </div>
        <div class="footer">
          <slot name="footer" :order="order" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["data"]);

const emit = defineEmits();
// 定义选中的订单数组
const selectedOrders = ref([]);
</script>

<style scoped lang="scss">
.table-container {
  .order-idx-list {
    .order-item {
      border: 1px solid #d8defe;
      border-radius: 6px;
      margin-bottom: 26px;
      overflow: hidden;

      .order-item-content {
        display: flex;
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
            // padding: 10px 20px;
            height: 100%;
          }
        }
        .shang-pin {
          flex-grow: 1;
        }
        .di-zhi {
          width: 260px;
          flex-shrink: 0;
        }
        .bei-zhu {
          width: 160px;
          flex-shrink: 0;
        }
        .dan-hao {
          width: 180px;
          flex-shrink: 0;
        }
        .cao-zuo {
          width: 160px;
          text-align: left;
          flex-shrink: 0;
        }
      }
      .footer {
        display: flex;
        padding: 10px 20px;
        background-color: #f9faff;
      }
    }
  }
}
</style>
