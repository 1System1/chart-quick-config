<template>
    <div style="width: 100%; height: 100%">
        <el-empty v-if="!datas.length" description="暂无数据" />
        <component v-else :is="chartName" :customConfig="customConfig" ref="chartRef" :datas="datas" :keyMap="keyMap"></component>
    </div>
</template>
<script>
    import { defineComponent, toRefs, reactive, defineAsyncComponent } from 'vue';

    export default defineComponent({
        components: {
            // 基础图形
            basicBar: defineAsyncComponent(() => import('@/views/chartComponents/default/basicBar.vue')),
            basicLine: defineAsyncComponent(() => import('@/views/chartComponents/default/basicLine.vue')),
            basicPie: defineAsyncComponent(() => import('@/views/chartComponents/default/basicPie.vue')),
            basicRadar: defineAsyncComponent(() => import('@/views/chartComponents/default/basicRadar.vue')),
            basicFunnel: defineAsyncComponent(() => import('@/views/chartComponents/default/basicFunnel.vue')),
            basicCandlestick: defineAsyncComponent(() => import('@/views/chartComponents/default/basicCandlestick.vue')),
            // 自定义图形
            stairBar: defineAsyncComponent(() => import('@/views/chartComponents/custom/stairBar.vue')),
            tagBar: defineAsyncComponent(() => import('@/views/chartComponents/custom/tagBar.vue')),
            doubleYAxis: defineAsyncComponent(() => import('@/views/chartComponents/custom/doubleYAxis.vue')),
            aGauge: defineAsyncComponent(() => import('@/views/chartComponents/custom/aGauge.vue')),
            bGauge: defineAsyncComponent(() => import('@/views/chartComponents/custom/bGauge.vue')),
            cGauge: defineAsyncComponent(() => import('@/views/chartComponents/custom/cGauge.vue')),
            dGauge: defineAsyncComponent(() => import('@/views/chartComponents/custom/dGauge.vue')),
        },
        props: {
            chartName: {
                type: String,
                default: '',
            },
            customConfig: {
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
