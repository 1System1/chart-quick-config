<template>
    <el-collapse-item title="主题方案" name="theme">
        <div class="config-item">
            <div class="config-item-col">
                <span class="config-item-title">主题</span>
                <el-select v-model="themeName" placeholder="请选择主题" size="default" clearable>
                    <el-option v-for="field in CHART_THEMES" :key="field.value" :label="field.label" :value="field.value"></el-option>
                </el-select>
            </div>
            <div class="theme-plan-row">
                <div :style="getBackgroudColor(activeTheme.backgroundColor)">
                    <a class="theme-plan-group">
                        <div v-for="c in activeTheme.colors" :key="c" class="theme-plan-color" :style="getBackgroudColor(c)"></div>
                    </a>
                </div>
            </div>
        </div>
        <div class="confirm">
            <el-button type="primary" @click="handleChangeTheme">运行</el-button>
        </div>
    </el-collapse-item>
</template>
<script>
    import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';
    import { CHART_THEMES } from '../../utils/constants';

    export default defineComponent({
        props: {
            customConfig: {
                type: Object,
                default: () => {},
            },
        },
        emits: ['handleChangeTheme'],
        setup(props, { emit }) {
            const state = reactive({
                themeName: 'customed',
            });
            const activeTheme = computed(() => {
                return CHART_THEMES.find((t) => t.value == state.themeName);
            });
            const getBackgroudColor = (color) => {
                return {
                    'background-color': color,
                };
            };
            const handleChangeTheme = () => {
                emit('handleChangeTheme', { themeName: state.themeName });
            };
            onMounted(() => {
                if (props.customConfig.themeName) {
                    state.themeName = props.customConfig.themeName;
                }
            });
            return {
                getBackgroudColor,
                CHART_THEMES,
                activeTheme,
                ...toRefs(state),
                handleChangeTheme,
            };
        },
    });
</script>
<style lang="scss" scoped>
    .theme-plan-row {
        width: 100%;
        padding-top: 8px;
        display: flex;

        .theme-plan-group {
            display: flex;
            width: auto;
            height: 24px;
            padding: 5px;
            overflow: hidden;
            border: 1px solid #eee;
            border-radius: 4px;
            flex-wrap: wrap;
            justify-content: space-between;
            .theme-plan-color {
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-right: 2px;

                margin-left: 2px;
                border-radius: 3px;
            }
        }
    }
</style>
