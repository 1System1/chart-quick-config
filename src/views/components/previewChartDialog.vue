<template>
    <el-dialog v-model="dialogVisible" :title="activeChart.title" :before-close="handleClose" custom-class="custom-dialog-common custom-dialog-width-600">
        <div class="export">
            <span>
                <icon-svg className="icon-xiazai" size="16" @click="exportImg"></icon-svg>
            </span>
        </div>
        <div class="show-chart" style="width: 100%; height: 300px; border: 1px solid #eee">
            <preview-chart
                v-if="isShowChart"
                ref="previewChartRef"
                :chartName="componentName"
                :customConfig="activeChart.customConfig"
                :datas="activeChart.datas"
                :keyMap="activeChart.keyMap" />
        </div>
        <template #footer>
            <el-button @click="handleClose">关 闭</el-button>
        </template>
    </el-dialog>
</template>
<script>
    import { computed, defineComponent, onMounted, toRefs, reactive } from 'vue';
    import previewChart from './previewChart.vue';
    // 弹框预览图形组件
    export default defineComponent({
        components: {
            previewChart,
        },
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
            activeChart: {
                type: Object,
                required: true,
            },
        },
        emits: ['update:visible'],
        setup(props, { emit }) {
            const state = reactive({
                isShowChart: false,
                previewChartRef: null,
                customConfig: {
                    themeName: 'customed',
                    title: {
                        show: false,
                    },
                },
            });
            const componentName = computed(() => {
                return props.activeChart.componentName;
            });
            const dialogVisible = computed({
                get: () => props.visible,
                set: (val) => emit('update:visible', val),
            });
            const handleClose = () => {
                emit('update:visible', false);
            };
            const exportImg = () => {
                const picInfo = state['previewChartRef'].chartRef.myChart.getDataURL({
                    // 导出的格式，可选 png, jpg, svg
                    // 注意：png, jpg 只有在 canvas 渲染器的时候可使用，svg 只有在使用 svg 渲染器的时候可用
                    type: 'png',
                    // 导出的图片分辨率比例，默认为 1。
                    pixelRatio: 1,
                    // 导出的图片背景色，默认使用 option 里的 backgroundColor
                    backgroundColor: '#fff',
                    // 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox']
                    // excludeComponents: "toolbox",
                });
                const elink = document.createElement('a');
                elink.download = componentName.value;
                elink.style.display = 'none';
                elink.href = picInfo;
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            };
            onMounted(() => {
                setTimeout(() => {
                    state.isShowChart = true;
                }, 200);
            });

            return {
                ...toRefs(state),
                componentName,
                dialogVisible,
                handleClose,
                exportImg,
            };
        },
    });
</script>
<style lang="scss" scoped>
    .export {
        display: flex;
        flex-direction: row-reverse;
        padding-right: 8px;
        .icon-svg {
            cursor: pointer;
            &:hover {
                color: #337ecc;
            }
        }
    }
</style>
