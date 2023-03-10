<template>
    <div class="slots">
        <el-collapse v-if="!loading" v-model="activeName" accordion>
            <!-- 数据 -->
            <chart-dataset :initialDatas="datas" :initialKeyMap="keyMap" @handleChangeDataset="handleChangeDataset"></chart-dataset>
            <!-- 主题 -->
            <chart-theme :customConfig="customConfig" @handleChangeTheme="handleChangeTheme"></chart-theme>
            <!-- 标题 -->
            <chart-title :customConfig="customConfig" @handleChangeTitle="handleChangeTitle"></chart-title>
            <!--  图例-->
            <chart-legend :customConfig="customConfig" @handleChangeLegend="handleChangeLegend"></chart-legend>
            <!--  提示框-->
            <chart-tooltip :customConfig="customConfig" @handleChangeTooltip="handleChangeTooltip"></chart-tooltip>

            <el-collapse-item title="提示框" name="5">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            </el-collapse-item>
            <el-collapse-item title="区域缩放" name="6">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
    import { defineComponent, onMounted, reactive, toRefs } from 'vue';
    import { getAllChartJson } from '@/configJson/index';
    import chartDataset from './slot/chartDataset';
    import chartTheme from './slot/chartTheme';
    import chartTitle from './slot/chartTitle';
    import chartLegend from './slot/chartLegend';
    import chartTooltip from './slot/chartTooltip';
    export default defineComponent({
        components: { chartDataset, chartTheme, chartTitle, chartLegend, chartTooltip },
        props: {
            chartName: {
                type: String,
                default: '',
            },
        },
        emits: ['handleChangeDataset', 'handleChangeCustomConfig'],
        setup(props, { emit }) {
            const state = reactive({
                customConfig: {},
                datas: '',
                keyMap: {
                    nameKey: '', // 类目轴
                    valueKeys: [
                        {
                            field: undefined,
                            name: '',
                        },
                    ], // 数值
                },
                activeName: 'dataset',
                loading: true,
            });
            /**
             * 左侧初始
             */
            const init = () => {
                let allJson = getAllChartJson();
                let json = allJson.find((r) => r.componentName == props.chartName);
                state.datas = JSON.stringify(json.datas);
                state.keyMap = json.keyMap;
                emit('handleChangeDataset', { datas: state.datas, keyMap: state.keyMap });
                state.loading = false;
            };
            // 数据
            const handleChangeDataset = ({ datas, keyMap }) => {
                emit('handleChangeDataset', { datas, keyMap });
            };
            // 主题
            const handleChangeTheme = (themeObject) => {
                emit('handleChangeCustomConfig', themeObject);
            };
            // 标题
            const handleChangeTitle = (titleObject) => {
                emit('handleChangeCustomConfig', titleObject);
            };
            // 图例
            const handleChangeLegend = (legendObject) => {
                emit('handleChangeCustomConfig', legendObject);
            };
            // 图例
            const handleChangeTooltip = (tooltipObject) => {
                emit('handleChangeCustomConfig', tooltipObject);
            };
            onMounted(() => {
                init();
            });
            return {
                ...toRefs(state),
                handleChangeDataset,
                handleChangeTheme,
                handleChangeTitle,
                handleChangeLegend,
                handleChangeTooltip,
            };
        },
    });
</script>
<style lang="scss" scoped>
    :deep(.el-collapse) {
        --el-collapse-header-height: 40px;
        --el-collapse-header-bg-color: #f5f5f5;
        --el-collapse-border-color: #ddd;
        .el-collapse-item {
            .el-collapse-item__header {
                padding-left: 12px;
            }
            .el-collapse-item__content {
                padding: 16px 12px 24px 6px;

                .config-item-col {
                    display: flex;
                    flex-direction: column;
                    margin-top: 8px;
                    .config-item-title {
                        font-weight: 600;
                        flex-shrink: 0;
                    }
                }
                .config-item-row {
                    display: flex;
                    margin-top: 8px;
                    height: 32px;
                    line-height: 32px;
                    align-items: center;
                    .config-item-title {
                        font-weight: 600;
                        flex-shrink: 0;
                        margin-right: 8px;
                        min-width: 60px;
                    }
                    .el-input + .el-input,
                    .el-select + .el-input {
                        margin-left: 8px;
                    }
                    .sub-icon {
                        width: 32px;
                        flex-shrink: 0;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                    }
                }
                .config-item-label {
                    flex-shrink: 0;
                    margin-right: 8px;
                    width: 80px;
                    text-align: right;
                }
                .el-input,
                .el-select {
                    width: 100%;
                }
            }
            .icon-svg {
                cursor: pointer;
            }
            .confirm {
                display: flex;
                justify-content: flex-end;
                padding-right: 12px;
                padding-top: 12px;
            }
        }
    }
</style>
