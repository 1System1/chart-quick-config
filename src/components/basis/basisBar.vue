
<template>
  <div class="canvas" ref="canvas"></div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      canvas: null,
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
