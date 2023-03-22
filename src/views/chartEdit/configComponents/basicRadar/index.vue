<template>
    <div class="slots">
        <!-- :collapse-transition="false" 不写展开会卡顿 -->
        <el-collapse v-if="!loading" v-model="activeName" accordion :collapse-transition="false">
            <!-- 数据 -->
            <chart-dataset :initialDatas="datas" @handleChangeDataset="handleChangeDataset" />
            <!-- 数据 -->
            <chart-key-map :initialDatas="datas" :initialKeyMap="customConfig.keyMap" @handleChangeKeyMap="handleChangeKeyMap" />
            <!-- 主题 -->
            <chart-theme :customConfig="customConfig" @handleChangeTheme="handleChangeTheme" />
            <!-- 标题 -->
            <chart-title :customConfig="customConfig" @handleChangeTitle="handleChangeTitle" />
            <!--  图例-->
            <chart-legend :customConfig="customConfig" @handleChangeLegend="handleChangeLegend" />
            <!-- 提示框  -->
            <chart-tooltip :customConfig="customConfig" @handleChangeTooltip="handleChangeTooltip" />
        </el-collapse>
    </div>
</template>
<script>
    import { defineComponent, onMounted, reactive, toRefs } from 'vue';

    import chartDataset from '../components/chartDataset';
    import chartKeyMap from '../components/chartKeyMap';
    import chartTheme from '../components/chartTheme';
    import chartTitle from '../components/chartTitle';
    import chartLegend from '../components/chartLegend';
    import chartTooltip from '../components/chartTooltip';
    import _merge from 'lodash/merge';
    export default defineComponent({
        name: 'BasicBar',
        components: { chartDataset, chartTheme, chartTitle, chartLegend, chartTooltip, chartKeyMap },
        props: {
            data: {
                type: String,
                default: () => '[]',
            },
            config: {
                type: Object,
                default: () => {},
            },
        },
        emits: ['changeChartConfig'],
        setup(props, { emit }) {
            const state = reactive({
                customConfig: {
                    keyMap: {
                        nameKey: '', // 类目轴
                        valueKeys: [
                            {
                                field: undefined,
                                name: '',
                            },
                        ], // 数值
                    },
                },
                datas: '',
                activeName: 'dataset',
                loading: true,
            });
            /**
             * 初始
             */
            const init = () => {
                state.datas = props.data;
                _merge(state.customConfig, props.config);
                state.loading = false;
            };
            // 数据
            const handleChangeDataset = ({ datas }) => {
                emit('changeChartConfig', { datas });
            };
            // 主题
            const handleChangeTheme = (themeObject) => {
                Object.assign(state.customConfig, themeObject);

                changeCustomConfig();
            };
            // 标题
            const handleChangeTitle = (titleObject) => {
                Object.assign(state.customConfig, titleObject);
                changeCustomConfig();
            };
            // 图例
            const handleChangeLegend = (legendObject) => {
                Object.assign(state.customConfig, legendObject);
                changeCustomConfig();
            };
            // 提示框
            const handleChangeTooltip = (tooltipObject) => {
                Object.assign(state.customConfig, tooltipObject);
                changeCustomConfig();
            };
            // 映射字段
            const handleChangeKeyMap = (keyMap) => {
                Object.assign(state.customConfig, keyMap);
                changeCustomConfig();
            };
            const changeCustomConfig = () => {
                emit('changeChartConfig', { customConfig: state.customConfig });
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
                handleChangeKeyMap,
            };
        },
    });
</script>
<style lang="scss" scoped>
    @import '../assets/chartConfig.scss';
</style>
