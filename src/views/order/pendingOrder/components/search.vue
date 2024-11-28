<template>
  <div class="search-title mb-20">搜索订单：</div>

  <el-form :inline="true" :model="formInline" class="form-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-form-item label="">
          <el-popover placement="right" :width="600" trigger="click">
            <template #reference>
              <el-button-group>
                <el-button type="primary">店铺</el-button>
                <el-select
                  v-model="formInline.region"
                  placeholder="请选择店铺名"
                  clearable
                  disabled
                  class="none-disabled-select"
                >
                  <el-option label="Zone one" value="shanghai" />
                  <el-option label="Zone two" value="beijing" />
                </el-select>
              </el-button-group>
            </template>
            <div class="form-container">
              <div class="flex">
                <el-form-item label="">
                  <el-button-group>
                    <el-button type="primary">名称</el-button>
                    <el-input v-model="formInline.region" placeholder="店铺名称" />
                  </el-button-group>
                </el-form-item>

                <el-form-item label="" class="ml-10 mr-10">
                  <el-button-group>
                    <el-button type="primary">备注</el-button>
                    <el-input v-model="formInline.region" placeholder="备注说明" />
                  </el-button-group>
                </el-form-item>

                <el-form-item label="">
                  <el-button-group>
                    <el-button type="primary">分组</el-button>
                    <el-select v-model="formInline.region" placeholder="店铺分组" clearable>
                      <el-option label="Zone one" value="shanghai" />
                      <el-option label="Zone two" value="beijing" />
                    </el-select>
                  </el-button-group>
                </el-form-item>
              </div>

              <div>
                <el-form-item label="">
                  <el-input
                    v-model="formInline.region"
                    placeholder="请输入快捷搜索格式"
                    clearable
                    class="input-with-large-cearch"
                  >
                    <template #append>
                      <el-button class="custom-btn">筛选</el-button>
                    </template>
                  </el-input>
                </el-form-item>
              </div>

              <div class="shop-list">
                <div v-for="item in 6" :key="item" class="shop-item">
                  <el-checkbox />
                  <span class="shop-name">疣体百货</span>
                  <span>ID：244124242142</span>
                  <span>分组：防护好服务凰求凤</span>
                  <span>备注：分那就康师傅哈开房间阿珂</span>
                </div>
              </div>

              <div class="flex flex-x-between">
                <pagination
                  v-if="total > 0"
                  v-model:total="total"
                  v-model:page="queryParams.pageNum"
                  v-model:limit="queryParams.pageSize"
                  :layout="'total,prev,pager,next'"
                  @pagination="getList"
                />
                <div class="flex">
                  <el-checkbox>全选店铺</el-checkbox>
                  <div class="my-tag ml-16">确认选择</div>
                </div>
              </div>
            </div>
          </el-popover>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">状态</el-button>
            <el-select v-model="formInline.region" placeholder="请选择状态" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">付款时间</el-button>
            <el-date-picker
              v-model="formInline.time"
              value-format="YYYY-MM-DD"
              format="YYYY-MM-DD"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">商品</el-button>
            <div class="shop-flag">
              <img v-for="(item, index) in shopFlagData" :key="index" :src="item.img" alt="" />
            </div>
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">商品</el-button>
            <el-input v-model="formInline.region" placeholder="搜索商品 ID 或名称" />
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">商品数量</el-button>
            <el-select v-model="formInline.region" placeholder="请选择商品数量" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-button-group>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">订单编号</el-button>
            <el-input v-model="formInline.region" placeholder="多个用空格，｜隔开" clearable />
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">快递单号</el-button>
            <el-input v-model="formInline.region" placeholder="快递单号" clearable />
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">买家昵称</el-button>
            <el-input v-model="formInline.region" placeholder="买家昵称" clearable />
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">姓名</el-button>
            <el-input v-model="formInline.region" placeholder="收件人姓名" clearable />
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">号码</el-button>
            <el-input v-model="formInline.region" placeholder="收件人号码" clearable />
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">地址</el-button>
            <el-input v-model="formInline.region" placeholder="收件人地址（模糊搜索）" clearable />
          </el-button-group>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">退款状态</el-button>
            <el-select v-model="formInline.region" placeholder="请选择退款状态" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">备注留言</el-button>
            <el-select v-model="formInline.region" placeholder="请选择" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">搜备注留言</el-button>
            <el-input v-model="formInline.region" placeholder="搜备注留言" clearable />
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">快递单</el-button>
            <el-select v-model="formInline.region" placeholder="请选择退款状态" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">发货单</el-button>
            <el-select v-model="formInline.region" placeholder="请选择退款状态" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">金额大于</el-button>
            <el-input
              v-model="formInline.region"
              style="max-width: 600px"
              clearable
              placeholder="金额大于"
            >
              <template #append>元</template>
            </el-input>
          </el-button-group>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="">
          <el-button-group>
            <el-button type="primary">金额小于</el-button>
            <el-input
              v-model="formInline.region"
              style="max-width: 600px"
              clearable
              placeholder="金额小于"
            >
              <template #append>元</template>
            </el-input>
          </el-button-group>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="18">
        <el-form-item label="">
          <el-button round class="search-btn">搜索订单</el-button>
          <el-button round>同步更新订单</el-button>
          <el-button :icon="Delete" text>清除条件</el-button>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="">
          <el-input
            v-model="formInline.region"
            placeholder="请输入快捷搜索格式"
            clearable
            class="input-with-large-cearch"
          >
            <template #prepend>
              <el-icon><Search /></el-icon>
            </template>
            <template #append>
              <el-button class="custom-btn" @click="onSubmit">查询</el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { shopFlagData, huiqi, ziqi, qingqi, lvqi, chengqi, hongqi } from "@/utils/qi";
import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";
const emit = defineEmits(["search"]);
const formInline = reactive({
  user: "",
  region: "",
  date: "",
  time: [],
});

// 提交整个表单传到父组件
const onSubmit = () => {
  emit("search", formInline);
};

const total = ref(1);
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
});

const getList = () => {};
</script>

<style lang="scss" scoped>
.search-title {
  font-size: 16px;
  font-weight: bold;
}

.search-btn {
  background-color: #52c41a;
  color: #fff;
  &:hover {
    background-color: #52c41a;
    color: #fff;
  }
}

// 搜索输入框长的 大的
.input-with-large-cearch {
  .el-input-group__prepend {
    background-color: #eef0f3;
    border: none;
    box-shadow: none;
    padding: 0 5px 0 20px;
  }
  .el-input__inner::placeholder {
    color: #909090;
  }
  .custom-btn {
    background-color: #52c41a;
    color: #fff;
    border-left: none;
    border-radius: 0 4px 4px 0;
    &:hover {
      background-color: #52c41a;
      color: #fff;
    }
  }
}

.shop-flag {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #eef0f3;
  border-radius: 4px;
  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
}
.shop-list {
  display: flex;
  flex-wrap: wrap; // 允许换行
  gap: 10px; // 添加间距
  border: 1px solid #f0f2f5;
  border-radius: 4px;
  padding: 6px;
  .shop-item {
    width: calc(25% - 10px); // 每个店铺项占据 25% 的宽度，减去间距
    height: 120px;
    background-color: #f0f2f5;
    padding: 9px 12px;
    overflow: hidden; // 确保溢出隐藏
    display: flex; // 使用 flexbox
    flex-direction: column; // 垂直排列
    border-radius: 4px;

    .shop-name {
      font-size: 14px;
      color: #2b3a57;
    }
    span {
      display: inline-block;
      font-size: 12px;
      color: #707a8d;
      white-space: nowrap; // 不换行
      overflow: hidden; // 超出部分隐藏
      text-overflow: ellipsis; // 添加省略号
      margin-bottom: 4px;
    }
  }
}

.my-tag {
  background-color: #f6ffed;
  padding: 4px 6px;
  color: #52c41a;
  border-radius: 2px;
  margin-right: 4px;
}
</style>
