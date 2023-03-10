<template>
    <div class="stair-bar" ref="stairBarRef"></div>
</template>

<script>
    import { defineComponent, onMounted, reactive, toRefs, markRaw } from 'vue';
    import * as echarts from 'echarts';
    import { commafy } from '@/views/utils';
    // 瀑布阶梯图
    export default defineComponent({
        name: 'StairBar',
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
                stairBarRef: null,
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
                state.myChart = markRaw(echarts.init(state['stairBarRef'], themeName));

                let option = getOption();
                Object.assign(option, props.customConfig);

                state.myChart.setOption(option);
                window.onresize = function () {
                    if (state.myChart) state.myChart.resize();
                };
            };
            // 判断两个数据是不是一正一负
            const isSymbolConsistent = (data1, data2) => {
                return data1 * data2 < 0;
            };

            // 获取当前值颜色,是否变红，绝对值
            const getValueColor = (value, red, abs) => {
                let obj = {
                    value: abs ? Math.abs(value) : value,
                    itemStyle: {
                        color: '#a90000',
                    },
                    label: {
                        position: 'bottom',
                    },
                };

                return red ? obj : value;
            };
            // 获取所有辅助值
            const getAllHelpValue = (data) => {
                let helpValus = [];
                let NumberSums = [];
                let NumberSum = 0;
                data.forEach((cell, index) => {
                    if (index === 0) {
                        helpValus.push(0); // 第一个辅助值为0
                        NumberSum += cell;
                        NumberSums.push(NumberSum);
                        if (data[index] < 0) data[index] = getValueColor(data[index], true, false);
                    } else if (isSymbolConsistent(NumberSum, cell)) {
                        // 一正一负
                        if (NumberSum < 0 && Math.abs(NumberSum) > cell) {
                            // 前面和<0,当前值大于0.相加之后还是小于0
                            helpValus.push(NumberSum + cell);
                            data[index] = -cell;
                        } else if (NumberSum < 0 && Math.abs(NumberSum) < cell) {
                            // 前面和<0,当前值大于0.相加之后还是大于0
                            helpValus.push(0);
                            data[index] = NumberSum + cell;
                            NumberSum += cell;
                            NumberSums.push(NumberSum);
                        } else if (NumberSum > 0 && NumberSum > Math.abs(cell)) {
                            // 和大于0， 当前值小于0 ,相加之后大于0
                            helpValus.push(NumberSum + cell);
                            data[index] = -cell;
                            NumberSum += cell;
                            data[index] = getValueColor(data[index], true, false);
                        } else if (NumberSum > 0 && cell < 0) {
                            helpValus.push(0); // 辅助值为 0
                            data[index] = NumberSum + cell;
                            NumberSum += cell;
                            NumberSums.push(NumberSum);
                            data[index] = getValueColor(data[index], true, false);
                        } else {
                            helpValus.push(0); // 辅助值为 0
                            data[index] = NumberSum + cell;
                            NumberSum += cell;
                            NumberSums.push(NumberSum);
                            data[index] = getValueColor(data[index]);
                        }
                    } else if (!isSymbolConsistent(NumberSum, cell)) {
                        // 符号相同
                        helpValus.push(NumberSum);
                        NumberSum += cell;
                        NumberSums.push(NumberSum);
                        if (data[index] < 0) data[index] = getValueColor(data[index], true, false);
                    }
                });
                return helpValus;
            };
            const getOption = () => {
                let datas = props.datas.map((r) => r[props.keyMap.valueKeys[0].field]);
                let seriesData = datas.concat(); // 数据处理过程中用到的数据，值会做改变
                let helpValus = getAllHelpValue(seriesData);
                let option = {
                    grid: {
                        left: 20,
                        right: 20,
                        bottom: 20,
                        top: 20,
                        containLabel: true,
                    },
                    xAxis: {
                        type: 'category',
                        data: props.datas.map((r) => r[props.keyMap.nameKey]),
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: [
                        {
                            name: 'Placeholder',
                            type: 'bar',
                            stack: 'Total',
                            itemStyle: {
                                borderColor: 'transparent',
                                color: 'transparent',
                            },
                            emphasis: {
                                itemStyle: {
                                    borderColor: 'transparent',
                                    color: 'transparent',
                                },
                            },
                            data: helpValus,
                        },
                        {
                            name: 'Income',
                            type: 'bar',
                            stack: 'Total',
                            label: {
                                show: true,
                                position: 'top',
                                formatter: (params) => {
                                    return commafy(datas[params.dataIndex], { digits: 2 });
                                },
                            },
                            data: seriesData,
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
    .stair-bar {
        width: 100%;
        height: 100%;
    }
</style>
