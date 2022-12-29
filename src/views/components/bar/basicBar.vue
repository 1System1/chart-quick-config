<template>
  <div class="basic-bar" ref="basicBarRef"></div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as echarts from "echarts";
// 基础柱状图
export default defineComponent({
  props: {
    keyMap: {
      type: Object,
      default: () => {
        return {
          nameKey: "", //类目
          valueKeys: [
            {
              field: "value",
              name: "系列1",
            },
          ],
        };
      },
    },
    datas: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      basicBarRef: null,
      myChart: null,
    });
    const init = () => {
      // 初始化echarts实例
      let myChart = echarts.init(state["basicBarRef"]);
      let option = getOption();
      myChart.setOption(option);
    };
    const getOption = () => {
      let option = {
        xAxis: {
          type: "category",
          data: props.keyMap.valueKeys.map((r) => r.name),
        },
        yAxis: {
          type: "value",
        },
        series: () => {
          let series = [];
          props.keyMap.valueKeys.for((valueKey) => {
            series.push({
              data: props.data.map((row) => row[valueKey.field]),
              name: valueKey.name,
              type: "bar",
            });
          });
          return series;
        },
      };
      return option;
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
.basic-bar {
  width: 100%;
  height: 100%;
}
</style>
