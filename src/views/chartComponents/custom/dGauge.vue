<template>
    <div class="d-gauge" ref="gaugeRef"></div>
</template>

<script>
    import { defineComponent, onMounted, reactive, toRefs, markRaw } from 'vue';
    import * as echarts from 'echarts';
    import { commafy } from '@/views/utils';
    // 钟表图
    export default defineComponent({
        name: 'DGauge',
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

                let max = 120; // 默认最大值
                let option = getOption(value, '#7AC943', max);

                if (props.customConfig) {
                    // 自定义配置
                    Object.assign(option, props.customConfig);
                }

                state.myChart.setOption(option);
                state.myChart.on('click', function () {});
            };

            const getOption = (value, color, max) => {
                if (value > max) {
                    max = value % 3 ? Math.ceil(Math.abs(value) / 3) * 3 : value;
                }
                let option = {
                    series: [
                        {
                            // 内圆环
                            name: '',
                            type: 'pie',
                            radius: ['70%', '78%'],
                            center: ['50%', '50%'],
                            zlevel: 1,
                            silent: true,
                            clockwise: false,
                            animation: false, // 去掉动画
                            startAngle: 270,

                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false,
                            },
                            data: [
                                {
                                    name: '', // 辅助值
                                    value: value <= 0 ? 150 : max / (3 / 4) - value,
                                    itemStyle: {
                                        color: '#D7D7DE',
                                    },
                                },
                                {
                                    name: '',
                                    itemStyle: {
                                        color: color,
                                    },
                                    value: value <= 0 ? 0 : value,
                                },
                            ],
                        },
                        {
                            // 刻度
                            type: 'gauge',
                            radius: '80%',
                            zlevel: 2,
                            center: ['50%', '50%'],
                            clockwise: true,
                            startAngle: 270,
                            endAngle: 0,
                            min: 0,
                            max: max, // 30的倍数 最小值150
                            splitNumber: 3,
                            axisTick: {
                                show: true,
                                width: 2,
                                splitNumber: 10,
                                lineStyle: {
                                    color: '#333',
                                },
                            },
                            splitLine: {
                                show: true,
                            },
                            axisLabel: {
                                show: true,
                                distance: 14,
                                color: '#333',
                                fontWeight: 'bold',
                                formatter: (value) => {
                                    return value.toFixed(2) * 1;
                                },
                            },
                            pointer: {
                                show: true,
                                width: 4,
                                icon: 'rect',
                                length: '50%',
                                itemStyle: {
                                    color: color,
                                },
                            },
                            anchor: {
                                show: true,
                                showAbove: true,
                                itemStyle: {
                                    color: '#FF0000',
                                    borderCap: 'butt',
                                },
                            },
                            data: [
                                {
                                    name: '',
                                    value: value,
                                },
                            ],
                            axisLine: {
                                show: false,
                            },
                            detail: {
                                show: true,
                                fontSize: 14,
                                color: '#FFB124',
                                padding: [0, 0, 0, 10],
                                formatter: (val) => {
                                    return commafy(val, { digits: 2 }) + '%';
                                },
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
    .d-gauge {
        width: 100%;
        height: 100%;
    }
</style>
