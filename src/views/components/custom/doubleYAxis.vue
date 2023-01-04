<template>
  <div class="double-y-axis" ref="doubleYAxisRef"></div>
</template>
<script>
import { defineComponent, reactive, toRefs, markRaw, onMounted } from "vue";
import * as echarts from "echarts";
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
  setup(props, { emit }) {
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
    const getOption = () => {};
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
