<template>
    <div ref="canvasRef" class="canvas"></div>
</template>
<script>
    import { defineComponent, reactive, toRefs, markRaw, onUnmounted, onMounted } from 'vue';
    import * as ECharts from 'echarts';

    export default defineComponent({
        props: {
            themeName: {
                // 主题
                type: String,
                default: '',
            },
            option: {
                // 配置
                type: Object,
                default: null,
            },
        },
        setup(props, { emit }) {
            const state = reactive({
                canvasRef: null,
                myChart: null,
            });
            const init = () => {
                if (props.themeName) {
                    // 主题
                    let chartTheme = require('./chartTheme/' + themeName);
                    ECharts.registerTheme(props.themeName, chartTheme);
                }
                state.myChart = markRaw(ECharts.init(state['canvasRef']));
                state.myChart.setOption(props.option);
                window.onresize = function () {
                    if (state.myChart) state.myChart.resize();
                };
            };

            onUnmounted(() => {
                if (state.myChart) state.myChart.dispose();
            });
            onMounted(() => {
                init();
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
