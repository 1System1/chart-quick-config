<template>
    <el-collapse-item title="标题" name="title">
        <div class="config-item">
            <div class="config-item-row">
                <span class="config-item-title">显示隐藏</span>
                <el-radio-group v-model="title.show">
                    <el-radio :label="true">显示</el-radio>
                    <el-radio :label="false">隐藏</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">主标题</span>
                <el-input v-model="title.text" placeholder="请输入主标题"></el-input>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">字体颜色</span>
                <el-color-picker v-model="title.textStyle.color"></el-color-picker>
                <span v-if="title.color" style="margin-left: 8px">{{ title.color }}</span>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">字体大小</span>
                <el-select v-model="title.textStyle.fontSize" placeholder="请选择字体大小" clearable filterable allow-create>
                    <el-option v-for="size in FONT_SIZE" :key="size" :label="`${size}px`" :value="size"></el-option>
                </el-select>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">字体风格</span>
                <el-radio-group v-model="title.show">
                    <el-radio v-for="s in FONT_STYLE" :key="s.value" :label="s.value">{{ s.label }}</el-radio>
                </el-radio-group>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">左边距</span>
                <el-select v-model="title.left" placeholder="请选择左边距" filterable allow-create clearable>
                    <el-option v-for="align in TITLE_ALIGN" :key="align.value" :label="align.label" :value="align.value"></el-option>
                    <el-option label="8px" value="8px"></el-option>
                    <el-option label="4%" value="4%"></el-option>
                </el-select>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">上边距</span>
                <el-select v-model="title.top" placeholder="请选择左边距" filterable allow-create clearable>
                    <el-option v-for="align in TITLE_ALIGN" :key="align.value" :label="align.label" :value="align.value"></el-option>
                    <el-option label="8px" value="8px"></el-option>
                    <el-option label="4%" value="4%"></el-option>
                </el-select>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">右边距</span>
                <el-select v-model="title.right" placeholder="请选择右边距" filterable allow-create clearable>
                    <el-option label="自适应" value="auto"></el-option>
                    <el-option label="8px" value="8px"></el-option>
                    <el-option label="4%" value="4%"></el-option>
                </el-select>
            </div>
            <div class="config-item-row">
                <span class="config-item-title">下边距</span>
                <el-select v-model="title.bottom" placeholder="请选择下边距" filterable allow-create clearable>
                    <el-option label="自适应" value="auto"></el-option>
                    <el-option label="8px" value="8px"></el-option>
                    <el-option label="4%" value="4%"></el-option>
                </el-select>
            </div>
        </div>
        <div class="confirm">
            <el-button type="primary" @click="handleChangeTitle">运行</el-button>
        </div>
    </el-collapse-item>
</template>
<script>
    import { defineComponent, reactive, toRefs } from 'vue';
    import { FONT_SIZE, FONT_STYLE, TITLE_ALIGN } from '../../utils/constants';
    export default defineComponent({
        emits: ['handleChangeTitle'],
        setup(props, { emit }) {
            const state = reactive({
                title: {
                    show: undefined, //是否显示标题组件。
                    text: undefined, // 主标题文本，支持使用 \n 换行
                    textStyle: {
                        color: undefined, // 字体颜色
                        fontStyle: undefined, // 字体风格
                        fontSize: undefined, // 字体大小
                    },
                    left: undefined, // 左边距
                    top: undefined, // 上边距
                    right: undefined, // 右边距
                    bottom: undefined, // 下边距
                },
            });
            // 去除 undefined 字段
            const getConfig = () => {
                return JSON.parse(JSON.stringify(state.title));
            };
            const handleChangeTitle = () => {
                emit('handleChangeTitle', { title: getConfig() });
            };
            return {
                FONT_SIZE,
                FONT_STYLE,
                TITLE_ALIGN,
                ...toRefs(state),
                handleChangeTitle,
            };
        },
    });
</script>
