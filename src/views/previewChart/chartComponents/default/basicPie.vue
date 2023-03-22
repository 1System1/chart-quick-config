<template>
    <div ref="basicPieRef" class="basic-pie"></div>
</template>

<script>
    import { defineComponent, onMounted, reactive, toRefs, markRaw } from 'vue';
    import * as echarts from 'echarts';
    import { commafy } from '../../utils';
    // 基础柱状图
    export default defineComponent({
        name: 'BasicPie',
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
                basicPieRef: null,
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
                state.myChart = markRaw(echarts.init(state['basicPieRef'], themeName));

                let option = getOption();
                Object.assign(option, props.customConfig);

                state.myChart.setOption(option);
                window.onresize = function () {
                    if (state.myChart) state.myChart.resize();
                };
            };
            const getOption = () => {
                let option = {
                    tooltip: {
                        trigger: 'item',
                        valueFormatter: (value) => {
                            return commafy(value, { digits: 2 });
                        },
                    },
                    series: {
                        type: 'pie',
                        radius: '65%',
                        label: {
                            formatter: '{b}: {d}%',
                        },
                        data: props.datas.map((r) => {
                            return {
                                name: r[props.keyMap.nameKey],
                                value: r[props.keyMap.valueKeys[0].field],
                                ...r,
                            };
                        }),
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                    },
                };

                return option;
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
    .basic-pie {
        width: 100%;
        height: 100%;
    }
</style>
