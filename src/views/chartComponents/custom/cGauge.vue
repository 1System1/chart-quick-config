<template>
    <div class="a-gauge" ref="gaugeRef"></div>
</template>

<script>
    import { defineComponent, onMounted, reactive, toRefs, markRaw } from 'vue';
    import * as echarts from 'echarts';
    import { commafy, getRangs } from '@/views/utils';
    // 基础柱状图
    export default defineComponent({
        name: 'CGauge',
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
                let valRang = getRangs();
                let rangs = [];
                valRang.forEach((r, index) => {
                    if (!index) rangs.push(r);
                    else rangs.push(r - valRang[index - 1]);
                });
                let sum = rangs.reduce((num, init = 0) => {
                    return (num += init);
                }); // 辅助值

                rangs.push(sum);

                let option = getOption(value, rangs);
                if (props.customConfig) {
                    // 自定义配置
                    Object.assign(option, props.customConfig);
                }

                state.myChart.setOption(option);
                state.myChart.on('click', function () {});
            };
            const getChartParams = (value, vals) => {
                let colors = ['#fff', '#FF7373', '#FFE197', '#D9FFD9', '#89EFE3'];
                let minVal = 0;
                let maxVal = vals[4];
                if (value > vals[4]) {
                    // 超出范围最大值
                    maxVal = value % 10 ? Math.ceil(value / 10) * 10 : value; //
                    vals[3] = maxVal - vals[4] + vals[3]; //饼图第一个区域
                    vals[4] = maxVal; //// 饼图最后一个区域
                }
                if (value < 0) {
                    // 值小于0
                    minVal = value % 10 ? Math.ceil(Math.abs(value) / 10) * -10 : value;
                    vals[0] = vals[0] - minVal;
                    vals[4] = vals[4] - minVal;
                }

                let datas = [
                    {
                        name: '',
                        value: vals[3],
                        itemStyle: {
                            color: colors[4],
                        },
                    },
                    {
                        name: '',
                        value: vals[2],
                        itemStyle: {
                            color: colors[3],
                        },
                    },
                    {
                        name: '',
                        value: vals[1],
                        itemStyle: {
                            color: colors[2],
                        },
                    },
                    {
                        name: '',
                        value: vals[0],
                        itemStyle: {
                            color: colors[1],
                        },
                    },
                    {
                        name: '',
                        value: vals[4],
                        itemStyle: {
                            color: colors[0],
                        },
                    },
                ];

                return { datas, minVal, maxVal };
            };
            const getOption = (value, rangs) => {
                const { datas, minVal, maxVal } = getChartParams(value, rangs);
                debugger;
                let option = {
                    series: [
                        {
                            type: 'pie',
                            radius: '90%',
                            center: ['50%', '70%'],
                            startAngle: 0, // 起始角度0
                            clockwise: false, // 逆时针
                            emphasis: {
                                disabled: true,
                            },
                            label: { show: false },
                            data: datas,
                        },
                        {
                            // 仪表盘
                            zlevel: 2,
                            min: minVal,
                            max: maxVal,
                            type: 'gauge',
                            startAngle: 180,
                            endAngle: 0,
                            radius: '90%',
                            center: ['50%', '70%'],
                            clockwise: true,
                            animation: false,
                            splitNumber: 4,
                            data: [
                                {
                                    value: value,
                                    name: '',
                                },
                            ],
                            axisTick: {
                                show: true,
                                distance: 2,
                                width: 2,
                                lineStyle: {
                                    color: '#333',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                            axisLabel: {
                                show: true,
                                distance: -40,
                            },
                            pointer: {
                                show: true,
                                itemStyle: {
                                    // 指针颜色
                                    color: '#F75840',
                                },
                            },
                            anchor: {
                                show: true,
                                showAbove: true,
                            },
                            axisLine: {
                                show: true,
                                roundCap: true,
                                lineStyle: {
                                    width: 2,
                                    color: [[1, '#4F5F6B']],
                                },
                            },
                            detail: {
                                show: true,
                                fontSize: 24,
                                color: '#FFB124',
                                fontWeight: 'bold',
                                offsetCenter: [0, '35%'],
                                formatter: (value) => {
                                    return commafy(value, { digits: 2 });
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
    .a-gauge {
        width: 100%;
        height: 100%;
    }
</style>
