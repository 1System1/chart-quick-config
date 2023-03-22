<template>
    <div ref="gaugeRef" class="a-gauge"></div>
</template>

<script>
    import { defineComponent, onMounted, reactive, toRefs, markRaw } from 'vue';
    import * as echarts from 'echarts';
    import { commafy } from '../../utils';
    // 基础柱状图
    export default defineComponent({
        name: 'AGauge',
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
                let option = getOption(value);

                if (props.customConfig) {
                    // 自定义配置
                    Object.assign(option, props.customConfig);
                }

                state.myChart.setOption(option);
                state.myChart.on('click', function () {});
            };
            const getColor = (value) => {
                let colors = ['#FFB124', '#FFB124', '#FFB124', '#FFB124'];
                if (value <= 25) return colors[0];
                else if (value <= 50) return colors[1];
                else if (value <= 75) return colors[2];
                else return colors[3];
            };
            const getOption = (value) => {
                let option = {
                    angleAxis: {
                        max: 100, // 默认最大值100
                        startAngle: -45,
                        clockwise: false,
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    radiusAxis: {
                        type: 'category',
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    polar: {
                        center: ['50%', '60%'],
                        radius: '150%',
                    },
                    series: [
                        {
                            // 内圆
                            zlevel: 4,
                            type: 'pie',
                            radius: ['40%', '50%'],
                            center: ['50%', '60%'],
                            silent: true, // 不响应鼠标
                            data: [
                                {
                                    value: 0,
                                    itemStyle: {
                                        color: '#E5EBF4',
                                    },
                                    label: {
                                        show: true,
                                        position: 'center',
                                        fontSize: 24,
                                        color: getColor(value),
                                        fontWeight: 'bold',
                                        formatter: () => {
                                            return commafy(value, { digits: 2 });
                                        },
                                    },
                                    labelLine: {
                                        smooth: true,
                                        lineStyle: {
                                            width: 0,
                                        },
                                    },
                                    hoverAnimation: false,
                                },
                            ],
                            animation: false,
                        },
                        {
                            // 内圆
                            zlevel: 3,
                            type: 'pie',
                            radius: '50%',
                            center: ['50%', '60%'],
                            silent: true, // 不响应鼠标
                            data: [
                                {
                                    value: 0,
                                    itemStyle: {
                                        color: '#fff',
                                    },
                                },
                            ],
                            animation: false,
                        },
                        {
                            // 绘制最外侧带颜色的圆弧
                            zlevel: 5,
                            type: 'bar',
                            roundCap: true,
                            data: [
                                {
                                    value: 75,
                                    itemStyle: {
                                        color: new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            1,
                                            0,
                                            [
                                                {
                                                    offset: 0.1,
                                                    color: '#FA5F5A', // 50% 处的颜色
                                                },
                                                {
                                                    offset: 0.2,
                                                    color: '#FFB124', // 50% 处的颜色
                                                },

                                                {
                                                    offset: 0.6,
                                                    color: '#FFDE5F', // 50% 处的颜色
                                                },
                                                {
                                                    offset: 1,
                                                    color: '#65D2A3', // 50% 处的颜色
                                                },
                                            ],
                                            false
                                        ),
                                    },
                                },
                            ],
                            coordinateSystem: 'polar',
                            barWidth: 10,
                        },
                        {
                            // 仪表盘
                            zlevel: 2,
                            min: 0,
                            max: 100,
                            type: 'gauge',
                            radius: '100%',
                            center: ['50%', '60%'],
                            clockwise: true,
                            animation: false,
                            splitNumber: 10,
                            data: [
                                {
                                    value: value,
                                    name: '',
                                },
                            ],
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                show: false,
                            },
                            axisLabel: {
                                show: false,
                            },
                            pointer: {
                                show: true,
                                width: 18,
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
