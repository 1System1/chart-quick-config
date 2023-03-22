<template>
    <div class="edit-chart">
        <div class="edit-body">
            <!-- 左侧配置编辑 -->
            <div class="edit-left">
                <edit-left :chartName="routerId" @changeChartConfig="changeChartConfig" />
            </div>
            <!-- 右侧图形预览 -->
            <div class="edit-right">
                <div class="item-right-chart">
                    <div class="right-top">
                        <el-tabs v-model="tabName" type="border-card">
                            <el-tab-pane label="自定义配置" name="config">
                                <sc-code-editor ref="configEditorRef" v-model="jsonConfig" height="100%" mode="json"></sc-code-editor>
                            </el-tab-pane>
                            <el-tab-pane label="数据" name="data">
                                <sc-code-editor ref="dataEditorRef" v-model="jsonDatas" height="100%" readOnly mode="json"></sc-code-editor>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="right-bottom" style="width: 100%; height: 50%">
                        <div class="preview-chart-ref">
                            <preview-chart
                                v-if="datas.length"
                                :key="refresh"
                                ref="previewChartRef"
                                :chartName="routerId"
                                :customConfig="customConfig"
                                :datas="stringToArray(datas)"
                                :keyMap="customConfig.keyMap" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { defineComponent, computed, reactive, toRefs, nextTick, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import editLeft from './editLeft.vue';
    import previewChart from '../previewChart/index.vue';
    let jsBeautify = require('js-beautify').js_beautify;
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

                customConfig: {}, // 配置
                refresh: true,
                tabName: 'data',
                dataEditorRef: null,
                configEditorRef: null,
            });

            // 字符串转数组
            const stringToArray = (strDatas) => {
                return JSON.parse(strDatas);
            };
            // 改变配置
            const changeChartConfig = ({ datas, customConfig }) => {
                if (datas) state.datas = datas;
                if (customConfig) Object.assign(state.customConfig, customConfig);
                debugger;
                refreshDom();
            };

            //刷新
            const refreshDom = () => {
                state.refresh = !state.refresh;
            };

            const jsonConfig = computed(() => {
                return jsBeautify(JSON.stringify(state.customConfig));
            });
            const jsonDatas = computed(() => {
                return jsBeautify(state.datas);
            });

            watch(
                () => state.tabName,
                (n) => {
                    nextTick(() => {
                        if (n == 'data') state['dataEditorRef'].refresh();
                        else state['configEditorRef'].refresh();
                    });
                },
                { immediate: true }
            );
            return {
                jsonConfig,
                jsonDatas,
                ...toRefs(state),
                routerId,
                stringToArray,
                changeChartConfig,
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
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    padding: 0 20px;

                    .right-top {
                        width: 100%;
                        height: calc(50% - 40px);
                        .el-tabs {
                            height: 100%;
                            :deep(.el-tabs__content) {
                                height: calc(100% - 70px);
                                .el-tab-pane {
                                    height: 100%;
                                }
                            }
                        }
                    }
                    .right-bottom {
                        width: 100%;
                        height: calc(50% - 40px);
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
