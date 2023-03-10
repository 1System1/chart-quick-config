<!--
 * @Author: shj shj@cnbisoft.com
 * @Date: 2022-09-29 20:13:53
 * @LastEditors: shj shj@cnbisoft.com
 * @LastEditTime: 2022-09-29 20:15:07
 * @FilePath: \chart-quick-config\src\views\components\canvas.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="canvas" ref="canvas"></div>
</template>
<script>
    import { defineComponent, reactive, toRefs, markRaw, onUnmounted } from 'vue';
    import * as ECharts from 'echarts';

    export default defineComponent({
        setup() {
            const state = reactive({
                canvas: null,
                myChart: null,
            });
            const init = () => {
                state.myChart = markRaw(ECharts.init(state['canvas']));
                window.onresize = function () {
                    if (state.myChart) state.myChart.resize();
                };
            };

            onUnmounted(() => {
                state.myChart.dispose();
            });
            return {
                ...toRefs(state),
                init,
            };
        },
    });
</script>
<style scoped>
    .canvas {
        width: 100%;
        height: 100%;
    }
</style>
