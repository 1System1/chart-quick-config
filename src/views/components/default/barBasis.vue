<template>
  <div class="barBasis">
    <custom-canvas ref="barBasis"></custom-canvas>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
import customCanvas from "../canvas.vue";

export default defineComponent({
  components: {
    customCanvas,
  },
  props: {
    keyMap: {
      type: Object,
      default: () => {
        return {
          x: "类目轴字段",
          series: [
            {
              key: "数值字段",
              name: "系列名称",
            },
            // ...
          ],
        };
      },
    },
    datas: {
      // 数据
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const state = reactive({
      barBasis: null,
    });
    const init = () => {
      /**
       * 初始画布
       */
      state["barBasis"].init();
    };

    return {
      ...toRefs(state),
      init,
    };
  },
});
</script>
<style scoped>
.barBasis {
  width: 100%;
  height: 100%;
}
</style>
