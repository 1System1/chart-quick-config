<template>
    <div class="basic-candlestick" ref="basicCandlestickRef"></div>
</template>

<script>
    import { defineComponent, onMounted, reactive, toRefs, markRaw } from 'vue';
    import * as echarts from 'echarts';
    import { commafy } from '@/views/utils';
    // 基础柱状图
    export default defineComponent({
        name: 'BasicCandlestick',
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
            const upColor = '#ec0000';
            const upBorderColor = '#8A0000';
            const downColor = '#00da3c';
            const downBorderColor = '#008F28';
            const state = reactive({
                basicCandlestickRef: null,
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
                state.myChart = markRaw(echarts.init(state['basicCandlestickRef'], themeName));

                const { values, categoryData } = splitData(props.datas);

                let option = getOption(categoryData, values);
                Object.assign(option, props.customConfig);
                state.myChart.setOption(option);
                window.onresize = function () {
                    if (state.myChart) state.myChart.resize();
                };
            };
            const getOption = (categoryData, valueDatas) => {
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                        },
                        valueFormatter: (value) => {
                            return commafy(value, { digits: 2 });
                        },
                    },
                    legend: {
                        data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
                    },
                    grid: {
                        left: '10%',
                        right: '10%',
                        bottom: '15%',
                    },
                    xAxis: {
                        type: 'category',
                        data: categoryData,
                        boundaryGap: false,
                        axisLine: {
                            onZero: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        min: 'dataMin',
                        max: 'dataMax',
                    },
                    yAxis: {
                        scale: true,
                        splitArea: {
                            show: true,
                        },
                    },
                    series: [
                        {
                            name: '日K',
                            type: 'candlestick',
                            data: valueDatas,
                            itemStyle: {
                                color: upColor,
                                color0: downColor,
                                borderColor: upBorderColor,
                                borderColor0: downBorderColor,
                            },
                        },
                        {
                            name: 'MA5',
                            type: 'line',
                            data: calculateMA(5, valueDatas),
                            smooth: false,
                            showSymbol: false,
                            lineStyle: {
                                opacity: 0.5,
                            },
                        },

                        {
                            name: 'MA10',
                            type: 'line',
                            data: calculateMA(10, valueDatas),
                            smooth: false,
                            showSymbol: false,
                            lineStyle: {
                                opacity: 0.5,
                            },
                        },
                        {
                            name: 'MA20',
                            type: 'line',
                            data: calculateMA(20, valueDatas),
                            smooth: false,
                            showSymbol: false,
                            lineStyle: {
                                opacity: 0.5,
                            },
                        },
                        {
                            name: 'MA30',
                            type: 'line',
                            data: calculateMA(30, valueDatas),
                            smooth: false,
                            showSymbol: false,
                            lineStyle: {
                                opacity: 0.5,
                            },
                        },
                    ],
                };
                return option;
            };
            // 获取数据
            const splitData = (datas) => {
                const nameKey = props.keyMap.nameKey;
                const [o, c, l, h] = props.keyMap.valueKeys;
                const categoryData = [];
                const values = [];
                for (let i = 0; i < datas.length; i++) {
                    categoryData.push(datas[i][nameKey]);
                    // 开盘，闭盘，最高，最低
                    values.push([datas[i][o.field], datas[i][c.field], datas[i][h.field], datas[i][l.field]]);
                }
                return {
                    values,
                    categoryData,
                };
            };
            // 计算平均值
            const calculateMA = (dayCount, datas) => {
                let result = [];
                for (let i = 0, len = datas.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    let sum = 0;
                    for (let j = 0; j < dayCount; j++) {
                        sum += datas[i - j][1];
                    }
                    result.push(sum / dayCount);
                }
                return result;
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
    .basic-candlestick {
        width: 100%;
        height: 100%;
    }
</style>
