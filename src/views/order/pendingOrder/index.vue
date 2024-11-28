<template>
  <div>
    <!-- 搜索组件 -->
    <searchFilter @search="handelSearch" />
    <!-- 表格tab 筛选 -->
    <div class="tabs-wrap mb-20 mt-30">
      <div class="tabs-container">
        <div
          v-for="tab in tsbList"
          :key="tab.value"
          class="tabs-item"
          :class="{ tabActive: tab.value === currentTab }"
          @click="handelTab(tab.value)"
        >
          <span>{{ tab.lable }}</span>
          <span class="tab-num">{{ tab.num }}</span>
        </div>
      </div>

      <div>
        <div class="custom-select" style="width: 350px">
          <el-button-group>
            <el-button type="primary">排前面订单</el-button>
            <el-select v-model="frontorder" placeholder="搜备注留言" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-button-group>
        </div>
      </div>
    </div>
    <div class="flex-y-center mb-10">
      <div>
        <div>
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
        </div>
        <div>已选 0 单</div>
      </div>

      <div style="margin-left: 20px">
        <el-button round>打印快递单</el-button>
        <el-button round>打印发货单</el-button>
        <el-button round>批量发货</el-button>
        <el-button round>更多操作</el-button>
      </div>
    </div>
    <div class="table-container">
      <div class="order-idx-list">
        <div v-for="(order, index) in orders" :key="index" class="order-item">
          <div class="order-item-content flex">
            <OrderColumn label="商品" width="300px" :order="order" style="flex-grow: 1">
              <template v-slot:default="{ order }">
                <div
                  v-for="(item, itemIndex) in order.items"
                  :key="itemIndex"
                  class="item-container"
                >
                  <img :src="item.image" class="item-image" alt="" />
                  <div class="ml-12">
                    <div class="name">{{ item.name }}</div>
                    <div class="sku">规格：{{ item.spec }}</div>
                    <div class="flex">
                      <div class="goods-tag">数量：{{ item.quantity }}</div>
                      <div class="goods-tag">金额：¥{{ item.price }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </OrderColumn>
            <OrderColumn label="地址" width="260px" :order="order" style="flex-grow: 0">
              <template v-slot:default="{ order }">
                <div
                  v-for="(item, itemIndex) in order.items"
                  :key="itemIndex"
                  class="item-container"
                >
                  {{ item.address }}
                </div>
              </template>
            </OrderColumn>
            <OrderColumn label="备注" width="160px" :order="order" style="flex-grow: 0">
              <template v-slot:default="{ order }">
                <div
                  v-for="(item, itemIndex) in order.items"
                  :key="itemIndex"
                  class="item-container"
                >
                  {{ item.remark }}
                </div>
              </template>
            </OrderColumn>
            <OrderColumn label="快递单号" width="180px" :order="order" style="flex-grow: 0">
              <template v-slot:default="{ order }">
                <div
                  v-for="(item, itemIndex) in order.items"
                  :key="itemIndex"
                  class="item-container"
                >
                  {{ item.trackingNumber }}
                </div>
              </template>
            </OrderColumn>
            <OrderColumn label="操作" width="160px" :order="order" style="flex-grow: 0">
              <template v-slot:default="{ order }">
                <div
                  v-for="(item, itemIndex) in order.items"
                  :key="itemIndex"
                  class="item-container"
                >
                  <div class="action-buttons flex">
                    <div class="action-button" @click="handleClick1(item)" />
                    <div class="action-button" @click="handleClick2(item)" />
                  </div>
                </div>
              </template>
            </OrderColumn>
          </div>
          <div class="footer">
            <div>订单ID: {{ order.id }}</div>
            <div>付款时间: {{ order.paymentTime }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed-pagination">
      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
    <AsyncShopOrderDialog />
    <PrintDeliveryNoteDialog />
    <PrintExpressDeliveryNoteDialog />
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import searchFilter from "./components/search.vue";
import OrderTable from "./components/OrderTable.vue";
import OrderColumn from "./components/OrderColumn.vue"; // 引入 OrderColumn
import AsyncShopOrderDialog from "./components/AsyncShopOrderDialog.vue";
import PrintDeliveryNoteDialog from "./components/PrintDeliveryNoteDialog.vue";
import PrintExpressDeliveryNoteDialog from "./components/PrintExpressDeliveryNoteDialog.vue";
const total = ref(1);
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
});
const tsbList = ref([
  {
    lable: "普通订单",
    value: 1,
    num: 1,
  },
  {
    lable: "部分订单发货",
    value: 2,
    num: 1,
  },
  {
    lable: "锁定订单",
    value: 3,
    num: 1,
  },
]);
const currentTab = ref(1);
const time = ref([]);
const handelTab = (value) => {
  currentTab.value = value;
};

const frontorder = ref();
// 示例订单数据
const orders = reactive([
  {
    id: "2974172947129847289",
    store: "啊啊百货",
    paymentTime: "2022-12-22 12:12:12",

    actions: "",
    items: [
      {
        name: "商品名称",
        spec: "1 包",
        quantity: 1,
        price: 47,
        trackingNumber: "232421421",
        remark: "爱情我放弃我",
        address: "美*，1*********，新疆维吾尔自治区 阿勒泰地区 富温县库额尔齐斯镇***********",
        image:
          "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/17197…%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20240603204530.png",
      },
      {
        name: "商品名称",
        spec: "1 包",
        quantity: 1,
        price: 47,
        trackingNumber: "232421421",
        remark: "爱情我放弃我",
        address: "美*，1*********，新疆维吾尔自治区 阿勒泰地区 富温县库额尔齐斯镇***********",
        image:
          "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/17197…%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20240603204530.png",
      },
    ],
  },
  {
    id: "2974172947129847289",
    store: "啊啊百货",
    paymentTime: "2022-12-22 12:12:12",

    actions: "",
    items: [
      {
        trackingNumber: "232421421",
        name: "商品名称",
        spec: "1 包",
        quantity: 1,
        price: 47,
        remark: "爱情我放弃我",
        address: "美*，1*********，新疆维吾尔自治区 阿勒泰地区 富温县库额尔齐斯镇***********",
        image:
          "https://xunfuli.oss-cn-hangzhou.aliyuncs.com/17197…%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20240603204530.png",
      },
    ],
  },
  // 其他订单...
]);

// 查询
const handelSearch = (data) => {
  console.log(data, "1111111");
};
// 测试点击事件
const testClick = () => {
  console.log("测试点击事件被触发");
};
const handleClick1 = (action) => {
  console.log(action, "被点击"); // 确认事件是否被触发
};
const handleClick2 = (action) => {
  console.log(action, "被点击"); // 确认事件是否被触发
};

const checkAll = ref(false);
const isIndeterminate = ref(true);
const handleCheckAllChange = (val: boolean) => {
  isIndeterminate.value = false;
};

const getList = () => {};
</script>

<style lang="scss" scoped>
.order-item {
  margin-bottom: 20px;
  border: 1px solid #d8defe;
}
.item-image {
  width: 80px;
  height: 80px;
  background-color: pink;
  border-radius: 2px;
}
.item-container {
  display: flex;
  height: 100px;
  padding: 10px 20px;
}
.name {
  font-weight: bold;
  color: #000000;
  font-size: 14px;
}
.sku {
  color: #777777;
  font-size: 14px;
}
.goods-tag {
  background-color: #f6ffed;
  padding: 4px 6px;
  color: #52c41a;
  border-radius: 2px;
  margin-right: 4px;
}
.action-button {
  width: 20px;
  height: 20px;
  background-color: red;
  cursor: pointer;
  margin: 0 20px;
}
.footer {
  display: flex;
  width: 100%;
  padding: 10px 20px;
  background-color: #f9faff;
}

.tabs-wrap {
  display: flex;
  justify-content: space-between;
  .tabs-container {
    display: flex;
    .tabs-item {
      padding: 6px 10px;
      background-color: #f0f2f5;
      font-size: 14px;
      color: #666666;
      margin-right: 10px;
      border-radius: 2px;
      cursor: pointer;
      .tab-num {
        padding-left: 4px;
      }
    }
    .tabActive {
      background-color: #f6ffed;
      color: #52c41a;
      font-size: 14px;
      border: 1px solid #52c41a;
    }
  }
}

.custom-select {
  display: flex;
  width: 100%;
  // 按钮组相关
  :deep(.el-button-group) {
    display: flex;
    width: 100%;
    background-color: #fff;
  }
  :deep(.el-button-group .el-button) {
    border: 1px solid #e1e9f6;
    border-right: none;
    color: #909090;
    background-color: #f0f2f5;
  }
  :deep(.el-select__wrapper) {
    background-color: #fff;
    box-shadow: none;
    border: 1px solid #e1e9f6;
    border-radius: 0 4px 4px 0;
  }
  :deep(.el-select__icon) {
    font-size: 16px;
    font-weight: bold;
    color: #858688;
  }
}
:deep(.el-button:hover) {
  background-color: #fff;
  border: 1px solid #52c41a;
  color: #52c41a;
  outline: none;
}
:deep(.el-button:active) {
  background-color: #fff;
  border: 1px solid #52c41a !important;
  color: #52c41a;
  outline: none;
}

.fixed-pagination {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  background: #ffffff;
  box-shadow: 0px -4px 26px rgba(0, 0, 0, 0.08);
}
</style>
