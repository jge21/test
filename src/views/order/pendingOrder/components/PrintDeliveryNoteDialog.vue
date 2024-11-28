<template>
  <el-dialog
    v-model="dialogVisible"
    title="打印发货单"
    width="800"
    :before-close="handleClose"
    :show-close="false"
  >
    <div class="flex justify-between">
      <div class="order-card">
        <div class="title">订单数量</div>
        <div class="content">
          <span>1</span>
          <span>单</span>
        </div>
      </div>
      <div class="order-card">
        <div class="title">订单数量</div>
        <div class="content">
          <span>1</span>
          <span>单</span>
        </div>
      </div>
    </div>

    <el-form :inline="true" :model="form" class="form-container">
      <el-form-item>
        <div class="flex w-100%">
          <el-button-group>
            <el-button type="primary">发件人地址</el-button>
            <el-select v-model="form.region" placeholder="请选择" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-button-group>

          <el-button type="primary" :icon="RefreshRight" class="ml-10" />
          <el-button type="primary" :icon="Setting">管理</el-button>
        </div>
      </el-form-item>

      <el-form-item>
        <div class="flex w-100%">
          <el-button-group>
            <el-button type="primary">发货单模板</el-button>
            <el-select v-model="form.region" placeholder="请选择" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-button-group>

          <el-button type="primary" :icon="RefreshRight" class="ml-10" />
          <el-button type="primary" :icon="Setting">管理</el-button>
        </div>
      </el-form-item>

      <el-form-item>
        <div class="flex w-100%">
          <el-button-group>
            <el-button type="primary">发货打印机</el-button>
            <el-select v-model="form.region" placeholder="请选择" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-button-group>
          <el-button type="primary" :icon="RefreshRight" class="ml-10" />
        </div>
      </el-form-item>

      <div class="mt-20 flex justify-around">
        <el-progress type="circle" :percentage="25" color="#52C41A">
          <template #default="{ percentage }">
            <div class="num">90</div>
            <div class="percentage-value">取单{{ percentage }}%</div>
          </template>
        </el-progress>
        <el-progress type="circle" :percentage="25" color="#52C41A">
          <template #default="{ percentage }">
            <div class="num">90</div>
            <div class="percentage-value">取单{{ percentage }}%</div>
          </template>
        </el-progress>
        <el-progress type="circle" :percentage="25" color="#52C41A">
          <template #default="{ percentage }">
            <div class="num">90</div>
            <div class="percentage-value">取单{{ percentage }}%</div>
          </template>
        </el-progress>
        <el-progress type="circle" :percentage="25" color="#52C41A">
          <template #default="{ percentage }">
            <div class="num">90</div>
            <div class="percentage-value">取单{{ percentage }}%</div>
          </template>
        </el-progress>
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer flex justify-between items-center justify-center">
        <div class="flex-center">
          <el-icon size="16" color="#FFB700"><WarningFilled /></el-icon>
          <span class="pl-4 font-size-12 color-#2B3A57">CLodop 组件：正在连接。。。</span>
        </div>

        <div>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button class="primary" type="primary" @click="dialogVisible = false">
            立即打单
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import { Delete, RefreshRight, Setting, Share, Upload } from "@element-plus/icons-vue";
const dialogVisible = ref(false);

const form = reactive({ region: "" });
const handleClose = (done: () => void) => {};
</script>

<style lang="scss" scoped>
.lable {
  font-size: 14px;
  color: #000;
  margin-bottom: 14px;
}
:deep(.dialog-footer .el-button) {
  color: #666666;
  background-color: #f0f2f5;
  border: none;
}
:deep(.dialog-footer .el-button--primary) {
  color: #2f9d47 !important;
  background-color: #f6ffed !important;
  border: none !important;
}

.order-card {
  width: 370px;
  height: 80px;
  padding: 14px 20px 12px 20px;
  background-color: #f6ffed;
  margin-bottom: 20px;
  .title {
    font-size: 14px;
    color: #000;

    margin-bottom: 6px;
  }
  .content {
    color: #000;
    & span:first-child {
      font-size: 20px;
      font-weight: bold;
    }
    & span:last-child {
      font-size: 12px;
      padding-left: 4px;
    }
  }
}
.num {
  font-size: 20px;
  color: #000;
  line-height: 28px;
  font-weight: bold;
}
.percentage-value {
  font-size: 12px;
  color: #909090;
}
</style>
