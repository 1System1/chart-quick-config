<template>
    <div class="slots">
        <component
            :is="defineAsyncComponent(() => import(`./configComponents/${chartName}/index`))"
            v-if="!loading"
            :config="customConfig"
            :data="datas"
            @changeChartConfig="changeChartConfig" />
    </div>
</template>
<script>
    import { defineComponent, onMounted, reactive, toRefs, defineAsyncComponent } from 'vue';
    import { getAllChartJson } from '@/mock';
    import basicBar from './configComponents/basicBar';

    export default defineComponent({
        components: { basicBar },
        props: {
            chartName: {
                type: String,
                default: '',
            },
        },
        emits: ['changeChartConfig'],
        setup(props, { emit }) {
            const state = reactive({
                customConfig: {},
                datas: [],
                loading: true,
            });
            /**
             * 左侧初始
             */
            const init = () => {
                let allJson = getAllChartJson();
                let json = allJson.find((r) => r.componentName == props.chartName);
                state.datas = JSON.stringify(json.datas);
                state.customConfig = json.customConfig;
                state.loading = false;
                changeChartConfig({ datas: state.datas, customConfig: state.customConfig });
            };
            /**
             * 修改配置
             * @param {} customConfig
             */
            const changeChartConfig = ({ datas, customConfig }) => {
                emit('changeChartConfig', { datas, customConfig });
            };

            onMounted(() => {
                init();
            });
            return {
                ...toRefs(state),
                defineAsyncComponent,
                changeChartConfig,
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
