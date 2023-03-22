<template>
    <div class="basic-radar" ref="basicRadarRef"></div>
</template>

<script>
    import { defineComponent, onMounted, reactive, toRefs, markRaw } from 'vue';
    import * as echarts from 'echarts';
    // 基础柱状图
    export default defineComponent({
        name: 'BasicRadar',
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
                basicRadarRef: null,
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
                state.myChart = markRaw(echarts.init(state['basicRadarRef'], themeName));

                let option = getOption();
                Object.assign(option, props.customConfig);

                state.myChart.setOption(option);
                window.onresize = function () {
                    if (state.myChart) state.myChart.resize();
                };
            };
            const getOption = () => {
                let option = {
                    legend: {
                        show: props.keyMap.valueKeys.length > 1,
                        data: props.keyMap.valueKeys.map((r) => r.name),
                        bottom: 20,
                    },
                    radar: {
                        // shape: 'circle',
                        indicator: props.datas.map((r) => {
                            return {
                                name: r[props.keyMap.nameKey],
                            };
                        }),
                    },
                    series: [
                        {
                            name: '',
                            type: 'radar',
                            data: getData(),
                        },
                    ],
                };

                return option;
            };
            const getData = () => {
                let datas = [];
                props.keyMap.valueKeys.forEach((r) => {
                    datas.push({
                        value: props.datas.map((row) => row[r.field]),
                        name: r.name,
                    });
                });
                return datas;
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
    .basic-radar {
        width: 100%;
        height: 100%;
    }
</style>
