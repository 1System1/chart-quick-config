<template>
  <div ref="tagBarRef" class="tag-bar"></div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs, markRaw } from "vue";

import * as echarts from "echarts";
import { commafy } from "@/views/utils";
//指标分析柱状图
export default defineComponent({
  name: "tagBar",
  props: {
    keyMap: {
      type: Object,
      required: true,
      default: () => {
        return {
          nameKey: "",
          valueKeys: [
            // 固定三个
            {
              field: "bnlj",
              name: "本年累计",
            },
            {
              field: "bnlj",
              name: "增减率",
              subfix: "", // 后缀
              indicatorType: 1, // 正反向指标
              formulaType: "", // 公式类型：增减额 zje、增减率  zjl
            },
            {
              field: "sntq",
              name: "上年同期",
            },
          ],
        };
      },
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
      tagBarRef: null,
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
      state.myChart = markRaw(echarts.init(state["tagBarRef"], themeName));

      const [k1, k2, k3] = props.keyMap.valueKeys;
      let row = props.datas.length ? props.datas[0] : {};
      let data = getChartData([k1, k2, k3], row);
      let option = getOptions([k1, k2, k3], data, k2.indicatorType);
      Object.assign(option, props.customConfig);
      state.myChart.setOption(option);
    };

    const getChartData = ([k1, k2, k3], row) => {
      let val1 = row[k1.field] || 0;
      let val3 = row[k3.field] || 0;
      let val2 = row[k2.field] || 0;
      if (k2.formulaType == "zjl") {
        //增减率
        val2 = !val1 ? 0 : ((val3 - val1) / Math.abs(val1)) * 100;
      } else if (k2.formulaType == "zje") {
        // 增减额
        val2 = val3 - val1;
      }
      return [val1, val2, val3];
    };
    /**
     *
     * @param {*} filedMap 字段映射
     * @param {*} data 数据
     * @param {*} indicatorType 正反向指标
     */
    const getOptions = ([k1, k2, k3], data, indicatorType) => {
      indicatorType = typeof indicatorType == "undefined" ? 1 : indicatorType;
      const [val1, val2, val3] = data;
      let xDatas = [k1.name, "", k3.name];
      let maxVal = Math.max(val1, val3);
      var option = {
        grid: {
          left: "20",
          right: "20",
          top: "20",
          bottom: "20",
          containLabel: true,
        },

        tooltip: {
          show: true,
          formatter: (params) => {
            if (!params.componentSubType) return "";
            return `${params.name}：${commafy(params.value, { digits: 2 })}`;
          },
        },

        xAxis: [
          {
            type: "category",
            data: xDatas,
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            type: "bar",
            data: [
              {
                value: val1,
                itemStyle: {
                  color: val1 ? "#5470c6" : "#ffb248",
                },
                label: {
                  position: val1 < 0 ? "bottom" : "top",
                },
              },
              null,
              {
                value: val3,
                itemStyle: {
                  color: val3 ? "#fac858" : "#ffb248",
                },
                label: {
                  position: val3 < 0 ? "insideBottom" : "top",
                },
              },
            ],
            barMinHeight: 5,
            barMaxWidth: 60,
            label: {
              show: true,
              // position: 'top',
              formatter: (params) => {
                if (!params.value) return "暂无数据";
                return commafy(params.value, { digits: 2 });
              },
            },
            markPoint: val2 && val3 ? getMorkPoint(indicatorType, maxVal, val2, k2.subfix) : null,
          },
        ],
      };
      return option;
    };

    /**
     *
     * @param {*} type  1正向指标 0 反向指标
     * @param {*} yVal  y轴位置
     * @param {*} val   值
     */
    const getMorkPoint = (type, yVal, val, subfix = "") => {
      let symbol = "";
      let color = "";
      let upSymbol =
        "path://M13.811,7h3.918L10.874,0,4.021,7H8.036c0,5-1.568,8.5-4.993,11C7.937,17,12.833,14,13.811,7Z";
      let downSymbol =
        "path://M13.811,11h3.918l-6.855,7L4.021,11H8.036c0-5-1.568-8.5-4.993-11C7.937,1,12.833,4,13.811,11Z";
      let upColor = "#22C72D";
      let downColor = "#ff2814";
      if (!val) return null;
      symbol = val > 0 ? upSymbol : downSymbol;
      if (type) {
        // 正向指标
        color = val > 0 ? upColor : downColor;
      } else {
        // 反向指标
        color = val > 0 ? downColor : upColor;
      }
      return {
        data: [
          {
            coord: [1, yVal],
            symbolOffset: [0, 20],
            symbol: symbol,
            itemStyle: {
              color: color,
            },
            value: commafy(val, { digits: 2 }) + subfix,
            label: {
              position: ["20%", "10%"],
              color: "#333",
            },
          },
        ],
      };
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
.tag-bar {
  width: 100%;
  height: 100%;
}
</style>
