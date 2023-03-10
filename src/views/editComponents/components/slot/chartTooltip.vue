<template>
    <el-collapse-item title="提示框" name="tooltip">
        <div class="config-item">
            <div class="config-item-row">
                <span class="config-item-title">是否显示</span>
                <el-radio-group v-model="legend.show">
                    <el-radio :label="true">显示</el-radio>
                    <el-radio :label="false">隐藏</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="confirm">
            <el-button type="primary" @click="handleChangeLegend">运行</el-button>
        </div>
    </el-collapse-item>
</template>
<script>
    import { defineComponent, reactive, toRefs } from 'vue';
    import { TITLE_ALIGN } from '../../utils/constants';

    export default defineComponent({
        emits: ['handleChangeLegend'],
        setup(props, { emit }) {
            const state = reactive({
                legend: {
                    show: undefined, //是否显示图例组件。
                    orient: undefined, // 布局朝向
                    left: undefined, // 左边距
                    top: undefined, // 上边距
                    right: undefined, // 右边距
                    bottom: undefined, // 下边距
                },
            });
            // 去除 undefined 字段
            const getConfig = () => {
                return JSON.parse(JSON.stringify(state.legend));
            };
            const handleChangeLegend = () => {
                emit('handleChangeLegend', { legend: getConfig() });
            };
            return {
                TITLE_ALIGN,
                ...toRefs(state),
                handleChangeLegend,
            };
        },
    });
</script>
