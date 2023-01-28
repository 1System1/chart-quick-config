<template>
  <div class="double-y-axis" ref="doubleYAxisRef"></div>
</template>
<script>
import { defineComponent, reactive, toRefs, markRaw, onMounted } from "vue";
import * as echarts from "echarts";
import { commafy } from "@/views/utils";
// 双Y轴
export default defineComponent({
  name: "doubleYAxis",
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
      doubleYAxisRef: null,
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
      state.myChart = markRaw(echarts.init(state["doubleYAxisRef"], themeName));

      let option = getOption();
      Object.assign(option, props.customConfig);

      state.myChart.setOption(option);
      window.onresize = function () {
        if (state.myChart) state.myChart.resize();
      };
    };
    const getOption = () => {
      let legendShow = props.keyMap.valueKeys.length > 1;
      let option = {
        grid: {
          left: 20,
          right: 20,
          top: 20,
          bottom: legendShow ? 40 : 20,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          valueFormatter: (value) => {
            return commafy(value, { digits: 2 });
          },
        },

        legend: {
          show: legendShow,
          data: props.keyMap.valueKeys.map((r) => r.name),
          bottom: 10,
        },
        xAxis: {
          type: "category",
          data: props.datas.map((r) => r[props.keyMap.nameKey]),
        },
        yAxis: [
          {
            type: "value",
          },
          {
            type: "value",
            splitLine: {
              show: false,
            },
          },
        ],

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
          type: valueKey.serieType, // 系列类型  bar/line
          yAxisIndex: valueKey.yAxisIndex, // y轴坐标 0/1
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
.double-y-axis {
  width: 100%;
  height: 100%;
}
</style>
