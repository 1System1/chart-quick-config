<template>
  <div class="basic-line" ref="basicLineRef"></div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, markRaw } from "vue";
import * as echarts from "echarts";
import { commafy } from "@/views/utils";
// 基础柱状图
export default defineComponent({
  props: {
    keyMap: {
      type: Object,
      required: true,
    },
    datas: {
      type: Array,
      default: () => [],
    },
    customConfig: {
      // 自定义配置
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const state = reactive({
      basicLineRef: null,
      myChart: null,
    });
    const init = () => {
      let themeName = props.customConfig?.themeName;
      if (themeName) {
        // 主题
        let chartTheme = require("../../utils/chartTheme/" + themeName);
        echarts.registerTheme(themeName, chartTheme);
      }

      // 初始化echarts实例
      state.myChart = markRaw(echarts.init(state["basicLineRef"], themeName));

      let option = getOption();
      Object.assign(option, props.customConfig);

      state.myChart.setOption(option);
      window.onresize = function () {
        if (state.myChart) state.myChart.resize();
      };
    };
    const getOption = () => {
      let option = {
        title: {
          show: true,
          text: "基础折线图",
          top: 8,
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          valueFormatter: (value) => {
            return commafy(value, { digits: 2 });
          },
        },
        legend: {
          show: props.keyMap.valueKeys.length > 1,
          data: props.keyMap.valueKeys.map((r) => r.name),
          bottom: 20,
        },
        xAxis: {
          type: "category",
          data: props.datas.map((r) => r[props.keyMap.nameKey]),
        },
        yAxis: {
          type: "value",
        },

        series: getSeries(),
      };

      return option;
    };
    const getSeries = () => {
      let series = [];
      props.keyMap.valueKeys.forEach((valueKey) => {
        series.push({
          data: props.datas.map((row) => row[valueKey.field]),
          name: valueKey.name,
          type: "line",
        });
      });
      return series;
    };

    onMounted(() => {
      init();
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.basic-line {
  width: 100%;
  height: 100%;
}
</style>
