<template>
    <el-collapse-item title="提示框" name="tooltip">
        <div class="config-item">
            <div class="config-item-row">
                <span class="config-item-title">显示隐藏</span>
                <el-radio-group v-model="tooltip.show">
                    <el-radio :label="true">显示</el-radio>
                    <el-radio :label="false">隐藏</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">触发类型</span>
                <el-radio-group v-model="tooltip.trigger">
                    <el-radio label="axis">坐标轴</el-radio>
                    <el-radio label="item">数据项</el-radio>
                    <el-radio label="none">不触发</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">背景色</span>
                <el-color-picker v-model="tooltip.backgroundColor"></el-color-picker>
                <span v-if="tooltip.backgroundColor" style="margin-left: 8px">{{ tooltip.backgroundColor }}</span>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">边框颜色</span>
                <el-color-picker v-model="tooltip.borderColor"></el-color-picker>
                <span v-if="tooltip.borderColor" style="margin-left: 8px">{{ tooltip.borderColor }}</span>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">边框宽度</span>
                <el-input-number v-model="tooltip.borderWidth" :min="0"></el-input-number>
            </div>
        </div>
        <div class="confirm">
            <el-button type="primary" @click="handleChangeTooltip">运行</el-button>
        </div>
    </el-collapse-item>
</template>
<script>
    import { defineComponent, reactive, toRefs } from 'vue';

    export default defineComponent({
        emits: ['handleChangeTooltip'],
        setup(props, { emit }) {
            const state = reactive({
                tooltip: {
                    show: undefined, //是否显示图例组件。
                    trigger: undefined, // 类型
                    backgroundColor: undefined, //背景色
                    borderColor: undefined, //边框颜色
                    borderWidth: undefined, // 边框宽度
                },
            });
            // 去除 undefined 字段
            const getConfig = () => {
                return JSON.parse(JSON.stringify(state.tooltip));
            };
            const handleChangeTooltip = () => {
                emit('handleChangeTooltip', { tooltip: getConfig() });
            };
            return {
                ...toRefs(state),
                handleChangeTooltip,
            };
        },
    });
</script>
