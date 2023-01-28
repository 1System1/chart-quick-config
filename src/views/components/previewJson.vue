<template>
  <el-dialog
    :title="activeChart.title"
    v-model="dialogVisible"
    width="30%"
    :before-close="handleClose"
    custom-class="preview-chart-dialog"
  >
    <template #footer>
      <el-button @click="handleClose"> 关闭</el-button>
    </template>
  </el-dialog>
</template>
<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    value: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const dialogVisible = computed({
      get: () => props.visible,
      set: (val) => emit("update:visible", val),
    });
    const handleClose = () => {
      emit("update:visible", false);
    };
    return {
      dialogVisible,
      handleClose,
    };
  },
});
</script>
