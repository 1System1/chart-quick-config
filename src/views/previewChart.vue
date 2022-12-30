<!--
 * @Author: shj shj@cnbisoft.com
 * @Date: 2022-12-29 09:21:19
 * @LastEditors: shj shj@cnbisoft.com
 * @LastEditTime: 2022-12-30 17:40:55
 * @FilePath: \chart-quick-config\src\views\previewChart.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <el-dialog
    :title="activeChart.title"
    v-model="dialogVisible"
    width="30%"
    :before-close="handleClose"
    custom-class="preview-chart-dialog"
  >
    <div class="export">
      <span>
        <icon-svg className="icon-xiazai" size="16" @click="exportImg"></icon-svg>
      </span>
    </div>
    <div class="show-chart" style="width: 100%; height: 300px; border: 1px solid #eee; display: none">
      <component
        :is="componentName"
        v-if="isShowChart"
        :customConfig="activeChart.customConfig"
        ref="chartRef"
        :datas="activeChart.datas"
        :keyMap="activeChart.keyMap"
      ></component>
    </div>
  </el-dialog>
</template>
<script>
import { computed, defineComponent, defineAsyncComponent, onMounted, toRefs, reactive } from "vue";
// 弹框预览图形组件
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    activeChart: {
      type: Object,
      required: true,
    },
  },
  components: {
    basicBar: defineAsyncComponent(() => import("./components/bar/basicBar.vue")),
    basicLine: defineAsyncComponent(() => import("./components/line/basicLine.vue")),
    basicPie: defineAsyncComponent(() => import("./components/pie/basicPie.vue")),
    tagBar: defineAsyncComponent(() => import("./components/bar/tagBar.vue")),
    basicRadar: defineAsyncComponent(() => import("./components/radar/basicRadar.vue")),
    stairBar: defineAsyncComponent(() => import("./components/bar/stairBar.vue")),
  },
  emits: ["update:visible"],
  setup(props, { emit }) {
    const state = reactive({
      isShowChart: false,
      chartRef: null,
      customConfig: {
        themeName: "customed",
        title: {
          show: false,
        },
      },
    });
    const componentName = computed(() => {
      return props.activeChart.componentName;
    });
    const dialogVisible = computed({
      get: () => props.visible,
      set: (val) => emit("update:visible", val),
    });
    const handleClose = () => {
      emit("update:visible", false);
    };
    const exportImg = () => {
      const picInfo = state["chartRef"].myChart.getDataURL({
        // 导出的格式，可选 png, jpg, svg
        // 注意：png, jpg 只有在 canvas 渲染器的时候可使用，svg 只有在使用 svg 渲染器的时候可用
        type: "png",
        // 导出的图片分辨率比例，默认为 1。
        pixelRatio: 1,
        // 导出的图片背景色，默认使用 option 里的 backgroundColor
        backgroundColor: "#fff",
        // 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox']
        // excludeComponents: "toolbox",
      });
      const elink = document.createElement("a");
      elink.download = componentName.value;
      elink.style.display = "none";
      elink.href = picInfo;
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    };
    onMounted(() => {
      setTimeout(() => {
        state.isShowChart = true;
      }, 200);
    });

    return {
      ...toRefs(state),
      componentName,
      dialogVisible,
      handleClose,
      exportImg,
    };
  },
});
</script>
<style lang="scss" scoped>
.export {
  display: flex;
  flex-direction: row-reverse;
  padding-right: 8px;
  .icon-svg {
    cursor: pointer;
    &:hover {
      color: #337ecc;
    }
  }
}
</style>
