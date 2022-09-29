<!--
 * @Author: shj shj@cnbisoft.com
 * @Date: 2022-09-29 14:14:14
 * @LastEditors: shj shj@cnbisoft.com
 * @LastEditTime: 2022-09-29 14:14:44
 * @FilePath: \chart-quick-config\src\components\iconSvg\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <svg :class="['icon-svg', className]" aria-hidden="true" :style="style">
    <use :xlink:href="'#' + className" />
  </svg>
</template>
<script>
import { defineComponent, computed } from "vue";
// svg 形式显示图标，可以显示多色图标
export default defineComponent({
  name: "IconSvg",
  props: {
    className: {
      // 图标class
      type: String,
      required: true,
    },
    size: {
      // 大小
      type: [Number, String],
      default: 14,
    },
    color: {
      // 颜色
      type: String,
      default: "",
    },
    grayscale: {
      // 灰度 boolean:true=>100,false=>0;number=>number
      type: [Boolean, Number],
      default: false,
    },
  },
  setup(props) {
    const style = computed(() => {
      return {
        width: props.size + "px",
        height: props.size + "px",
        color: props.color,
        filter: `grayscale(${typeof props.grayscale == "boolean" ? (props.grayscale ? 100 : 0) : props.grayscale}%)`,
      };
    });
    return {
      style,
    };
  },
});
</script>
<style scoped>
.icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
``
