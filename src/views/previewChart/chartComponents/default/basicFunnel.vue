<template>
    <div ref="basicFunnelRef" class="basic-funnel"></div>
</template>

<script>
    import { defineComponent, onMounted, reactive, toRefs, markRaw } from 'vue';
    import * as echarts from 'echarts';
    import { commafy } from '../../utils';
    // 基础柱状图
    export default defineComponent({
        name: 'BasicFunnel',
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
                basicFunnelRef: null,
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
                state.myChart = markRaw(echarts.init(state['basicFunnelRef'], themeName));

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
                        valueFormatter: (value) => {
                            return commafy(value, { digits: 2 });
                        },
                    },
                    legend: {
                        data: props.datas.map((r) => {
                            return r[props.keyMap.nameKey];
                        }),
                        bottom: 8,
                    },
                    series: [
                        {
                            type: 'funnel',
                            left: '10%',
                            top: 40,
                            bottom: 40,
                            width: '75%',
                            label: {
                                show: false,
                                position: 'inside',
                            },
                            data: props.datas.map((r) => {
                                let obj = {
                                    name: r[props.keyMap.nameKey],
                                    value: r[props.keyMap.valueKey],
                                };
                                return Object.assign(obj, r);
                            }),
                        },
                    ],
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
    .basic-funnel {
        width: 100%;
        height: 100%;
    }
</style>
