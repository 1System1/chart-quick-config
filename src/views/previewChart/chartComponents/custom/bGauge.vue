<template>
    <div ref="gaugeRef" class="a-gauge"></div>
</template>

<script>
    import { defineComponent, onMounted, reactive, toRefs, markRaw } from 'vue';
    import * as echarts from 'echarts';
    import { commafy, getIndex, getRangs } from '../../utils';
    // 基础柱状图
    export default defineComponent({
        name: 'BGauge',
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
                default: () => {
                    return {};
                },
            },
        },
        setup(props) {
            const state = reactive({
                gaugeRef: null,
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
                state.myChart = markRaw(echarts.init(state['gaugeRef'], themeName));

                let value = 0;
                if (props.datas.length) {
                    value = props.datas[0][props.keyMap.valueKey] || 0;
                }

                let colors = getColors(value, props.customConfig.month);
                let range = getRangs(props.customConfig.month);
                let option = getOption(value, colors, Math.max(...range));
                if (props.customConfig) {
                    // 自定义配置
                    Object.assign(option, props.customConfig);
                }

                state.myChart.setOption(option);

                state.myChart.on('click', function () {});
            };
            const getColors = (value, month) => {
                // [内圈颜色,外圈颜色]
                let colors = [
                    ['#F79292', '#FF5F5F'],
                    ['#FFE3A6', '#FFC73B'],
                    ['#D9FFD9', '#5CF7A6'],
                    ['#89EFE3', '#3CE5DC'],
                ];
                let index = getIndex(value, month);
                return colors[index];
            };
            const getOption = (value, colors, max) => {
                let option = {
                    series: [
                        {
                            type: 'pie',
                            name: '外圆环',
                            radius: ['72%', '77%'],
                            center: ['50%', '55%'],

                            itemStyle: {
                                color: colors[1],
                            },
                            label: {
                                show: false,
                            },
                            emphasis: {
                                disabled: true,
                            },
                            data: [100],
                        },
                        {
                            // 内圆环
                            name: '',
                            type: 'pie',
                            radius: ['45%', '60%'],
                            center: ['50%', '55%'],

                            clockwise: true,
                            startAngle: 90,
                            z: 0,
                            zlevel: 0,
                            label: {
                                show: true,
                                position: 'center',
                                fontSize: 24,
                                color: '#FFB124',
                                fontWeight: 'bold',
                                formatter: () => {
                                    return commafy(value, { digits: 2 });
                                },
                            },
                            emphasis: {
                                disabled: true,
                            },
                            labelLine: {
                                show: false,
                            },
                            data: [
                                {
                                    // 辅助圆环
                                    name: '',
                                    value: value <= 0 ? max : value >= max ? 0 : max - value,
                                    itemStyle: {
                                        color: '#E5E5E5',
                                    },
                                },
                                {
                                    name: '',
                                    itemStyle: {
                                        color: colors[0],
                                    },
                                    value: value <= 0 ? 0 : value >= max ? max : value,
                                },
                            ],
                        },
                        {
                            // 刻度
                            type: 'gauge',
                            radius: '68%',
                            center: ['50%', '55%'],
                            clockwise: true,
                            startAngle: 0,
                            endAngle: 0.11,
                            splitNumber: 100,

                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                length: 14,
                                distance: 4,
                                lineStyle: {
                                    width: 2,
                                    color: '#fff',
                                },
                            },
                            axisLabel: {
                                show: false,
                            },
                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                show: false,
                            },
                            detail: {
                                show: false,
                            },
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
    .a-gauge {
        width: 100%;
        height: 100%;
    }
</style>
