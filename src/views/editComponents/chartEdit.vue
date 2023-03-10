<template>
    <div class="edit-chart">
        <div class="edit-body">
            <!-- 左侧配置编辑 -->
            <div class="edit-left">
                <edit-left :chartName="routerId" @handleChangeDataset="handleChangeDataset" @handleChangeCustomConfig="handleChangeCustomConfig" />
            </div>
            <!-- 右侧图形预览 -->
            <div class="edit-right">
                <div class="item-right-chart">
                    <el-card class="box-card" style="width: 100%; height: 100%" shadow="hover">
                        <div class="preview-chart-ref">
                            <preview-chart
                                v-if="datas.length"
                                :key="refresh"
                                ref="previewChartRef"
                                :chartName="routerId"
                                :customConfig="customConfig"
                                :datas="stringToArray(datas)"
                                :keyMap="keyMap" />
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { defineComponent, computed, reactive, toRefs } from 'vue';
    import { useRouter } from 'vue-router';
    import editLeft from './components/editLeft.vue';
    import previewChart from '@/views/components/previewChart.vue';
    // 编辑页面
    export default defineComponent({
        components: { editLeft, previewChart },
        setup() {
            const router = useRouter();
            const routerId = computed(() => {
                return router.currentRoute.value.params.id;
            });
            const state = reactive({
                datas: '', // 数据
                keyMap: {}, // 字段映射
                customConfig: {}, // 配置
                refresh: true,
            });

            // 字符串转数组
            const stringToArray = (strDatas) => {
                return JSON.parse(strDatas);
            };
            // 改变数据
            const handleChangeDataset = ({ datas, keyMap }) => {
                state.datas = datas;
                state.keyMap = keyMap;
                refreshDom();
            };
            const handleChangeCustomConfig = (newConfig) => {
                Object.assign(state.customConfig, newConfig);
                debugger;
                refreshDom();
            };
            //刷新
            const refreshDom = () => {
                state.refresh = !state.refresh;
            };

            return {
                ...toRefs(state),
                routerId,
                stringToArray,
                handleChangeDataset,
                handleChangeCustomConfig,
            };
        },
    });
</script>
<style lang="scss" scoped>
    .edit-chart {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .el-alert {
            display: flex;
            justify-content: center;
        }
        .edit-body {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            .edit-left {
                width: 500px;
                height: 100%;
                border-right: 1px solid #eee;
            }
            .edit-right {
                min-width: 300px;
                flex-grow: 1;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .item-right-chart {
                    width: 50%;
                    height: 50%;
                    :deep(.el-card__body) {
                        width: 100%;
                        height: 100%;
                        padding: 0;
                        .preview-chart-ref {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                // background-color: #f9f9f9;
            }
        }
    }
</style>
