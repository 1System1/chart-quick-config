<template>
    <div ref="basicBarRef" class="basic-bar"></div>
</template>

<script>
    import { defineComponent, onMounted, reactive, toRefs, markRaw } from 'vue';
    import * as echarts from 'echarts';
    import { commafy } from '@/views/utils';
    import _merge from 'lodash/merge';
    // 基础柱状图
    export default defineComponent({
        name: 'BasicBar',
        props: {
            keyMap: {
                type: Object,
                required: true,
            },
            datas: {
                type: Array,
                default: () => [],
            },
            customConfig: {
                // 自定义配置
                type: Object,
                default: null,
            },
        },
        setup(props) {
            const state = reactive({
                basicBarRef: null,
                myChart: null,
            });
            const init = () => {
                let themeName = props.customConfig?.themeName;
                if (themeName) {
                    // 主题
                    let chartTheme = require('../../utils/chartTheme/' + themeName);
                    echarts.registerTheme(themeName, chartTheme);
                }

                // 初始化echarts实例
                state.myChart = markRaw(echarts.init(state['basicBarRef'], themeName));

                let option = getOption();
                // 递归合并
                _merge(option, props.customConfig);
                console.log(option);
                state.myChart.setOption(option);
                window.onresize = function () {
                    if (state.myChart) state.myChart.resize();
                };
            };
            const getOption = () => {
                let option = {
                    grid: {
                        containLabel: true,
                    },

                    tooltip: {
                        valueFormatter: (value) => {
                            return commafy(value, { digits: 2 });
                        },
                    },
                    legend: {
                        data: props.keyMap.valueKeys.map((r) => r.name),
                        bottom: '10px',
                    },
                    xAxis: {
                        type: 'category',
                        data: props.datas.map((r) => r[props.keyMap.nameKey]),
                    },
                    yAxis: {
                        type: 'value',
                    },

                    series: getSeries(),
                };

                return option;
            };
            const getSeries = () => {
                let series = [];
                props.keyMap.valueKeys.forEach((valueKey) => {
                    series.push({
                        data: props.datas.map((row) => row[valueKey.field]),
                        name: valueKey.name,
                        type: 'bar',
                    });
                });
                return series;
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
    .basic-bar {
        width: 100%;
        height: 100%;
    }
</style>
