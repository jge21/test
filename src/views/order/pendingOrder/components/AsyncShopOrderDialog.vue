<template>
  <el-dialog
    v-model="dialogVisible"
    title="同步店铺订单"
    width="600"
    :before-close="handleClose"
    :show-close="false"
  >
    <el-form :inline="true" :model="form" class="form-container">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="">
            <el-button-group>
              <el-button type="primary">店铺</el-button>
              <el-select v-model="form.region" placeholder="请选择" clearable>
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-button-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="">
            <el-button-group>
              <el-button type="primary">每页同步</el-button>
              <el-select v-model="form.region" placeholder="请选择" clearable>
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-button-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="">
            <el-button-group>
              <el-button type="primary">订单</el-button>
              <el-select v-model="form.region" placeholder="请选择" clearable>
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-button-group>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="">
            <el-date-picker
              v-model="form.region"
              type="datetimerange"
              range-separator=" - "
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="lable">共 1 个店铺</div>
      <div class="mb-24">
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="0"
          status="success"
          color="#52C41A"
        />
      </div>
      <div class="lable">完成：100%</div>
      <div class="mb-24">
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="100"
          status="success"
          color="#52C41A"
        />
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button class="primary" type="primary" @click="dialogVisible = false">
          开始同步订单
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";

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
</style>
