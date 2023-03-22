<template>
    <div style="width: 100%; height: 100%">
        <el-empty v-if="!datas.length" description="暂无数据" />
        <component :is="chartName" v-else ref="chartRef" :customConfig="customConfig" :datas="datas" :keyMap="keyMap"></component>
    </div>
</template>
<script>
    import { defineComponent, toRefs, reactive, defineAsyncComponent } from 'vue';

    export default defineComponent({
        components: {
            // 基础图形
            basicBar: defineAsyncComponent(() => import('./chartComponents/default/basicBar.vue')),
            basicLine: defineAsyncComponent(() => import('./chartComponents/default/basicLine.vue')),
            basicPie: defineAsyncComponent(() => import('./chartComponents/default/basicPie.vue')),
            basicRadar: defineAsyncComponent(() => import('./chartComponents/default/basicRadar.vue')),
            basicFunnel: defineAsyncComponent(() => import('./chartComponents/default/basicFunnel.vue')),
            basicCandlestick: defineAsyncComponent(() => import('./chartComponents/default/basicCandlestick.vue')),
            // 自定义图形
            stairBar: defineAsyncComponent(() => import('./chartComponents/custom/stairBar.vue')),
            tagBar: defineAsyncComponent(() => import('./chartComponents/custom/tagBar.vue')),
            doubleYAxis: defineAsyncComponent(() => import('./chartComponents/custom/doubleYAxis.vue')),
            aGauge: defineAsyncComponent(() => import('./chartComponents/custom/aGauge.vue')),
            bGauge: defineAsyncComponent(() => import('./chartComponents/custom/bGauge.vue')),
            cGauge: defineAsyncComponent(() => import('./chartComponents/custom/cGauge.vue')),
            dGauge: defineAsyncComponent(() => import('./chartComponents/custom/dGauge.vue')),
        },
        props: {
            chartName: {
                // 图形组件名称
                type: String,
                default: '',
            },
            customConfig: {
                // 图形配置
                type: Object,
                default: null,
            },
            keyMap: {
                type: Object,
                required: true,
            },
            datas: {
                type: Array,
                required: true,
                default: () => [],
            },
        },
        setup() {
            const state = reactive({
                chartRef: null,
            });
            return {
                ...toRefs(state),
            };
        },
    });
</script>
