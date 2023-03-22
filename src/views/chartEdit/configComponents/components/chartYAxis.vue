<template>
    <el-collapse-item title="Y轴" name="yAxis">
        <div class="config-item">
            <div class="config-item-row">
                <span class="config-item-title">显示隐藏</span>
                <el-radio-group v-model="yAxis.show">
                    <el-radio :label="true">显示</el-radio>
                    <el-radio :label="false">隐藏</el-radio>
                </el-radio-group>
            </div>
            <!-- <div class="config-item-row">
                <span class="config-item-title">类型</span>
                <el-radio-group v-model="yAxis.type">
                    <el-radio label="category">类目轴</el-radio>
                    <el-radio label="value">数值轴</el-radio>
                </el-radio-group>
            </div> -->
            <div class="config-item-row">
                <span class="config-item-title">轴线</span>
                <el-radio-group v-model="yAxis.axisLine.show">
                    <el-radio :label="true">显示</el-radio>
                    <el-radio :label="false">隐藏</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">刻度线</span>
                <el-radio-group v-model="yAxis.axisTick.show">
                    <el-radio :label="true">显示</el-radio>
                    <el-radio :label="false">隐藏</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">分割线</span>
                <el-radio-group v-model="yAxis.splitLine.show">
                    <el-radio :label="true">显示</el-radio>
                    <el-radio :label="false">隐藏</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">标签</span>
                <el-radio-group v-model="yAxis.axisLabel.show">
                    <el-radio :label="true">显示</el-radio>
                    <el-radio :label="false">隐藏</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">旋转角度</span>
                <el-select v-model="yAxis.axisLabel.rotate" placeholder="标签旋转角度" filterable allow-create clearable>
                    <el-option label="90度" :value="90"></el-option>
                    <el-option label="45度" :value="45"></el-option>
                    <el-option label="-45度" :value="-45"></el-option>
                    <el-option label="-90度" :value="-90"></el-option>
                </el-select>
            </div>
        </div>
        <div class="confirm">
            <el-button type="primary" @click="handleChangeYAxis">运行</el-button>
        </div>
    </el-collapse-item>
</template>
<script>
    import { defineComponent, reactive, toRefs } from 'vue';
    export default defineComponent({
        emits: ['handleChangeYAxis'],
        setup(props, { emit }) {
            const state = reactive({
                yAxis: {
                    show: undefined, //是否显示横轴。
                    type: undefined, // 类型
                    axisLine: {
                        show: undefined, // 显示轴线
                    },
                    axisTick: {
                        show: undefined, // 显示刻度线
                    },
                    splitLine: {
                        show: undefined, // 显示分割线
                    },
                    axisLabel: {
                        show: undefined, // 显示标签
                    },
                },
            });
            // 去除 undefined 字段
            const getConfig = () => {
                return JSON.parse(JSON.stringify(state.yAxis));
            };
            const handleChangeYAxis = () => {
                emit('handleChangeYAxis', { yAxis: getConfig() });
            };
            return {
                ...toRefs(state),
                handleChangeYAxis,
            };
        },
    });
</script>
