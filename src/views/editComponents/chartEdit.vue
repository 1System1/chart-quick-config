<template>
  <div class="edit-chart">
    <el-alert v-if="isShowTooltip" title="请先输入图形需要展示的数据" type="warning"> </el-alert>
    <div class="edit-body">
      <!-- 左侧配置编辑 -->
      <div class="edit-left"></div>
      <!-- 右侧图形预览 -->
      <div class="edit-right"></div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
// 编辑页面
export default defineComponent({
  setup() {
    const router = useRouter();
    const routerId = computed(() => {
      return router.currentRoute.value.params.id;
    });
    const state = reactive({
      datas: [],
      isShowTooltip: true, // 是否显示提示
    });
    // 获取配置文件
    console.log(routerId);
    const init = () => {
      // 1、 进入页面先提示造数据
      // 2、获取图形配置
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
.edit-chart {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .edit-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    .edit-left {
      flex-grow: 1;
      min-width: 400px;
      height: 100%;
      background-color: aquamarine;
    }
    .edit-right {
      min-width: 300px;
      width: 30%;
      height: 100%;
      background-color: #f9f9f9;
    }
  }
}
</style>
