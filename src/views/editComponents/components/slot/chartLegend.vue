<template>
    <el-collapse-item title="图例" name="legend">
        <div class="config-item">
            <div class="config-item-row">
                <span class="config-item-title">是否显示</span>
                <el-radio-group v-model="legend.show">
                    <el-radio :label="true">显示</el-radio>
                    <el-radio :label="false">隐藏</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">布局朝向</span>
                <el-radio-group v-model="legend.orient">
                    <el-radio label="horizontal">水平</el-radio>
                    <el-radio label="vertical">垂直</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">左边距</span>
                <el-select v-model="legend.left" placeholder="请选择左边距" filterable allow-create clearable>
                    <el-option v-for="align in TITLE_ALIGN" :key="align.value" :label="align.label" :value="align.value"></el-option>
                    <el-option label="8px" value="8px"></el-option>
                    <el-option label="4%" value="4%"></el-option>
                </el-select>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">上边距</span>
                <el-select v-model="legend.top" placeholder="请选择左边距" filterable allow-create clearable>
                    <el-option v-for="align in TITLE_ALIGN" :key="align.value" :label="align.label" :value="align.value"></el-option>
                    <el-option label="8px" value="8px"></el-option>
                    <el-option label="4%" value="4%"></el-option>
                </el-select>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">右边距</span>
                <el-select v-model="legend.right" placeholder="请选择右边距" filterable allow-create clearable>
                    <el-option label="自适应" value="auto"></el-option>
                    <el-option label="8px" value="8px"></el-option>
                    <el-option label="4%" value="4%"></el-option>
                </el-select>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">下边距</span>
                <el-select v-model="legend.bottom" placeholder="请选择下边距" filterable allow-create clearable>
                    <el-option label="自适应" value="auto"></el-option>
                    <el-option label="8px" value="8px"></el-option>
                    <el-option label="4%" value="4%"></el-option>
                </el-select>
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
