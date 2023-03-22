<template>
    <el-collapse-item title="映射字段" name="keyMap">
        <!-- 映射字段 -->
        <div class="config-item">
            <div class="config-item-col">
                <span class="config-item-title">字段映射</span>
                <div class="config-item-row">
                    <span class="config-item-label">类目</span>
                    <el-select v-model="keyMap.nameKey" filterable allow-create clearable placeholder="请输入对应key值">
                        <el-option v-for="item in fields" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div v-for="item in keyMap.valueKeys" :key="item.field" class="config-item-row">
                    <span class="config-item-label">数值</span>
                    <el-select v-model="item.field" filterable allow-create placeholder="请输入对应key值">
                        <el-option v-for="field in fields" :key="field.value" :label="field.label" :value="field.value" />
                    </el-select>
                    <el-input v-model="item.name" placeholder="请输入名称" :disabled="true" />
                </div>
            </div>
        </div>

        <div class="confirm">
            <el-button type="primary" @click="handleChangeKeyMap">运行</el-button>
        </div>
    </el-collapse-item>
</template>
<script>
    import { defineComponent, toRefs, reactive, onMounted } from 'vue';
    export default defineComponent({
        props: {
            initialKeyMap: {
                type: Object,
                default: null,
                required: true,
            },
        },
        emits: ['handleChangeKeyMap'],
        setup(props, { emit }) {
            const state = reactive({
                fields: [], // 字段
                datas: '',
                keyMap: {
                    nameKey: '', // 类目轴
                    valueKeys: [
                        // 数值
                        {
                            field: undefined,
                            name: '',
                        },
                    ],
                },
            });
            // 点击加号
            const handleClickJia = (item) => {
                if (item.field && item.name) {
                    state.keyMap.valueKeys.push({
                        field: undefined,
                        name: '',
                    });
                } else {
                    // baseMessage('请先输入当前行key值及名称');
                }
            };
            // 点击减号
            const handleClickJian = (item) => {
                let index = state.keyMap.valueKeys.findIndex((r) => r.field == item.field);
                state.keyMap.valueKeys.splice(index, 1);
            };

            const handleChangeKeyMap = () => {
                emit('handleChangeKeyMap', { keyMap: state.keyMap });
            };
            onMounted(() => {
                state.keyMap = props.initialKeyMap;
            });
            return {
                ...toRefs(state),
                handleClickJia,
                handleClickJian,
                handleChangeKeyMap,
            };
        },
    });
</script>

<style lang="scss" scoped></style>
