<template>
  <div class="home">
    <div class="home-head">
      <div class="head-left">
        <span class="label">图表：</span>
        <!-- 头部显示所有图形类型 -->
        <!-- 选中蓝色，未选中灰色 -->
        <el-tag :type="getTagType('all')" @click="clickTag('all')" class="tag-item">全部</el-tag>
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
      <div class="block">
        <!--  -->
        <div class="chart-item" v-for="(item, index) in filterChartResult" :key="index">
          <el-card class="box-card" style="width: 100%; height: 100%" shadow="hover">
            <el-image class="img-item" :src="item.imgUrl">
              <template #error>
                <icon-svg :className="item.icon || 'icon-tupian-jiazaishibai'" size="24"></icon-svg>
              </template>
            </el-image>
            <div class="chart-info">
              <span class="title">
                <icon-svg :className="item.icon" size="14" v-if="item.icon" style="margin-right: 8px" />{{
                  item.title
                }}</span
              >
              <div class="btn-icon">
                <span title="编辑" @click="editChart(item)">
                  <icon-svg className="icon-bianji" size="14"></icon-svg>
                </span>
                <span title="预览" @click="previewChart(item)">
                  <icon-svg className="icon-yulan" size="14" style="margin-left: 12px"></icon-svg>
                </span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <preview-chart v-model:visible="previewVisible" v-if="previewVisible"></preview-chart>
  </div>
</template>

<script>
// 首页显示所有图形

import { defineComponent, onMounted, reactive, toRefs } from "vue";
import ChartKey from "./keys/ChartKey";
import { getDefaultChartJson } from "@/option-json";
import previewChart from "./previewChart";
export default defineComponent({
  name: "indexView",
  components: { previewChart },
  setup() {
    const state = reactive({
      activeTypes: ["all"], // 选中的图形类型
      keyword: "", // 关键字搜索
      defaultCharts: [], // 系统默认配置
      customCharts: [], // 自定义配置
      filterChartResult: [], // 过滤后结果
      previewVisible: false,
    });
    const chartTypes = ChartKey.CHART_TYPES;
    // 获取tag类型
    const getTagType = (chartType) => {
      return state.activeTypes.includes(chartType) ? "success" : "info";
    };
    // 点击图形类型标签
    const clickTag = (chartType) => {
      if (chartType == "all") {
        // 全部
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
      filterChart();
    };
    const filterChart = () => {
      let allCharts = state.defaultCharts.concat(state.customCharts);
      if (state.activeTypes.includes("all")) {
        state.filterChartResult = allCharts;
      } else {
        state.filterChartResult = allCharts.filter((r) => state.activeTypes.includes(r.type));
      }
    };
    /**
     * 编辑图形跳转路由
     */
    const editChart = () => {
      //
    };
    /**
     * 图形预览
     */
    const previewChart = () => {
      state.previewVisible = true;
    };
    // 初始化所有图形json
    const initChartJson = () => {
      // 系统图形
      state.defaultCharts = getDefaultChartJson();
      filterChart();
    };
    onMounted(() => {
      initChartJson();
    });
    return {
      chartTypes,
      getTagType,
      ...toRefs(state),
      clickTag,
      editChart,
      previewChart,
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
  .all-chart {
    height: calc(100% - 121px);
    padding: 24px 32px 24px 8px;
    overflow-y: hidden;
    display: flex;
    .block {
      width: 100%;

      overflow-y: auto;

      .chart-item {
        cursor: pointer;
        display: inline-flex;
        width: 300px;
        height: 254px;
        margin-left: 24px;
        margin-top: 24px;
        :deep(.el-card__body) {
          width: calc(100% - 40px);
          height: calc(100% - 40px);
          .img-item {
            background-color: #f5f7fa;
            width: 100%;
            height: calc(100% - 24px);
            .el-image__wrapper {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          .chart-info {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .title {
              font-weight: 500;
              line-height: 1.4;
              font-size: 12px;
            }
            .btn-icon {
              display: flex;
              align-items: center;

              .icon-svg:hover {
                color: #337ecc;
              }
            }
          }
        }
        .card-shadow {
          width: 302px;
          height: 230px;
          background-color: rgba(0, 0, 0, 0.7);
          position: relative;
          top: -230px;
          display: none;
          cursor: pointer;
          .shad-content {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: flex-end;
            .footer {
              display: flex;
              justify-content: space-between;
              width: 100%;
              margin-bottom: 12px;
              padding: 0 16px;
              .title {
                color: #fff;
                font-weight: 500;
                line-height: 1.4;
              }
              .btn-icon {
                display: flex;
                align-items: center;
                color: #fff;
                .icon-svg:hover {
                  color: #337ecc;
                }
              }
            }
          }
        }
        // &:hover {
        //   .card-shadow {
        //     display: block;
        //   }
        // }
      }
    }
  }
}
</style>
