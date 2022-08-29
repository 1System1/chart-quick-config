<template>
  <div class="home">
    <div class="home-head">
      <!-- 头部显示所有图形类型 -->
      <!-- 选中蓝色，未选中灰色 -->
      <el-tag type="info">标签三</el-tag>
    </div>
    <div class="all-chart">
      <!-- 显示所有图形配置，卡片-懒加载形式展示 -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

// 首页显示所有图形
export default {
  name: "HomeView",
  components: {},
};
</script>
