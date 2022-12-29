<template>
  <el-dialog title="提示" v-model:visible="dialogVisible" width="30%" :before-close="handleClose">
    <span>这是一段信息</span>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { computed, defineComponent } from "vue";
// 弹框预览图形组件
export default defineComponent({
  props: {
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
    return {
      dialogVisible,
    };
  },
});
</script>
