<template>
  <div class="home">
    <div class="home-head">
      <div class="head-left">
        <span class="label">图表：</span>
        <!-- 头部显示所有图形类型 -->
        <!-- 选中蓝色，未选中灰色 -->
        <el-tag :type="getTagType('all')" @click="clickTag('all')">全部</el-tag>
        <el-tag
          v-for="item in chartTypes"
          :type="getTagType(item.type)"
          :key="item.type"
          class="tag-item"
          @click="clickTag(item.type)"
          >{{ item.text }}</el-tag
        >
      </div>
      <div class="head-right">
        <el-input v-model="keyword" placeholder="输入关键字搜索"></el-input>
      </div>
    </div>
    <div class="all-chart">
      <!-- 显示所有图形配置，卡片-懒加载形式展示 -->
    </div>
  </div>
</template>

<script>
// 首页显示所有图形

import { defineComponent, onMounted, reactive, toRefs } from "vue";
import ChartKey from "./keys/ChartKey";
export default defineComponent({
  name: "indexView",
  setup() {
    const state = reactive({
      activeTypes: ["all"], // 选中的图形类型
      keyword: "", // 关键字搜索
      defaultChart: [], // 系统默认配置
      customChart: [], // 自定义配置
    });
    const chartTypes = ChartKey.CHART_TYPES;
    // 获取tag类型
    const getTagType = (chartType) => {
      return state.activeTypes.includes(chartType) ? "success" : "info";
    };
    // 点击图形类型标签
    const clickTag = (chartType) => {
      if (chartType == "all") {
        state.activeTypes.splice(0, state.activeTypes.length, chartType);
      } else if (state.activeTypes.includes(chartType)) {
        // 已经选中状态，点击取消
        state.activeTypes = state.activeTypes.filter((r) => r != chartType);
        if (!state.activeTypes.length) {
          state.activeTypes.push("all");
        }
      } else {
        // 排除全部
        state.activeTypes = state.activeTypes.filter((r) => r != "all");
        // 点击图形类型
        state.activeTypes.push(chartType);
      }
    };
    const initChartJson = () => {
      // 加载主题
      // const option = require.context("../option-json", false, /\.json$/);
      // console.log(option);
      // Themes.keys().map(Themes);
    };
    onMounted(() => {
      initChartJson();
    });
    return {
      chartTypes,
      getTagType,
      ...toRefs(state),
      clickTag,
    };
  },
});
</script>
<style scoped lang="scss">
.home {
  height: 100%;
  .home-head {
    height: 56px;
    padding: 8px 32px;
    display: flex;
    flex-direction: row;
    white-space: pre-wrap;
    align-items: center;
    border-bottom: 1px solid #eee;
    .head-left {
      width: calc(100% - 260px);
      .label {
        color: #2e2929;
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
      }
      .tag-item {
        cursor: pointer;
        margin: 12px 8px;
      }
    }

    .head-right {
      min-width: 250px;
      flex-shrink: 0;
    }
  }
}
</style>
