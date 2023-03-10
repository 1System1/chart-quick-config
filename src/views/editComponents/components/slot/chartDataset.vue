<template>
    <el-collapse-item title="数据" name="dataset">
        <!-- 图形展示数据 -->
        <div class="config-item">
            <div class="config-item-col">
                <span class="config-item-title">展示数据</span>
                <el-input
                    v-model="datas"
                    placeholder="请输入图形展示数据"
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10 }"
                    @change="handleChangeValue"></el-input>
            </div>
        </div>
        <!-- 映射字段 -->
        <div class="config-item">
            <div class="config-item-col">
                <span class="config-item-title">字段映射</span>
                <div class="config-item-row">
                    <span class="config-item-label">类目</span>
                    <el-select v-model="keyMap.nameKey" filterable allow-create clearable placeholder="请输入对应key值" size="default">
                        <el-option v-for="item in fields" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div v-for="(item, index) in keyMap.valueKeys" :key="item.field" class="config-item-row">
                    <span class="config-item-label">数值</span>
                    <el-select v-model="item.field" filterable allow-create placeholder="请输入对应key值" size="default">
                        <el-option v-for="field in fields" :key="field.value" :label="field.label" :value="field.value"></el-option>
                    </el-select>
                    <el-input v-model="item.name" placeholder="请输入名称"></el-input>
                    <div class="sub-icon">
                        <!-- 最后一个加号 -->
                        <icon-svg v-if="index == keyMap.valueKeys.length - 1" className="icon-jia" size="24" @click="handleClickJia(item)" />
                        <!-- 其余减号 -->
                        <icon-svg v-else className="icon-jian" size="24" @click="handleClickJian(item)" />
                    </div>
                </div>
            </div>
        </div>
        <!-- 数据 TODO 待实现-->
        <div class="config-item">
            <div class="config-item-col">
                <span class="config-item-title">数据转换</span>
                <div class="config-item-col">
                    <!-- 过滤不需要展现的数据 -->
                    <span class="config-item-title">过滤</span>
                    <div v-for="(item, index) in transform.filters" :key="item.field" class="config-item-row">
                        <el-select v-model="item.field" filterable allow-create placeholder="请输入对应key值" size="default" clearable>
                            <el-option v-for="field in fields" :key="field.value" :label="field.label" :value="field.value"></el-option>
                        </el-select>
                        <el-select v-model="item.field" filterable allow-create placeholder="请选择关系" size="default" clearable>
                            <el-option v-for="field in symbols" :key="field.value" :label="field.label" :value="field.value"></el-option>
                        </el-select>
                        <el-input v-model="item.name" placeholder="请输入值"></el-input>
                        <div class="sub-icon">
                            <!-- 最后一个加号 -->
                            <icon-svg v-if="index == keyMap.valueKeys.length - 1" className="icon-jia" size="24" @click="handleClickJia(item)" />
                            <!-- 其余减号 -->
                            <icon-svg v-else className="icon-jian" size="24" @click="handleClickJian(item)" />
                        </div>
                    </div>
                </div>
                <div class="config-item-col">
                    <!-- 排序 -->
                    <span class="config-item-title">排序</span>
                </div>
            </div>
        </div>
        <div class="confirm">
            <el-button type="primary" @click="handleChangeDataset">运行</el-button>
        </div>
    </el-collapse-item>
</template>
<script>
    import { defineComponent, toRefs, reactive, onMounted } from 'vue';

    export default defineComponent({
        props: {
            initialDatas: {
                type: String,
                default: '',
            },
            initialKeyMap: {
                type: Object,
                default: null,
                required: true,
            },
        },
        emits: ['handleChangeDataset'],
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
                // 数据转换
                transform: {
                    filters: [],
                    sorts: [],
                },
                symbols: [
                    {
                        label: '大于',
                        value: '>',
                    },
                    {
                        label: '小于',
                        value: '<',
                    },
                    {
                        label: '等于',
                        value: '==',
                    },
                    {
                        label: '大于等于',
                        value: '>=',
                    },
                    {
                        label: '小于等于',
                        value: '<=',
                    },
                    {
                        label: '不为空',
                        value: 'notNull',
                    },
                    {
                        label: '为空',
                        value: 'null',
                    },
                    {
                        label: '包含',
                        value: 'contains',
                    },
                ],
            });
            // 点击加号
            const handleClickJia = (item) => {
                if (item.field && item.name) {
                    state.keyMap.valueKeys.push({
                        field: undefined,
                        name: '',
                    });
                } else {
                    baseMessage('请先输入当前行key值及名称');
                }
            };
            // 点击减号
            const handleClickJian = (item) => {
                let index = state.keyMap.valueKeys.findIndex((r) => r.field == item.field);
                state.keyMap.valueKeys.splice(index, 1);
            };
            // 数值
            const handleChangeValue = () => {
                // 检测字段
                try {
                    if (state.datas) {
                        let datas = JSON.parse(state.datas);
                        if (Array.isArray(datas) && datas.length) {
                            // 判断是不是数组
                            for (let key in datas[0]) {
                                state.fields.push({ label: key, value: key });
                            }
                        }
                    }
                } catch (e) {
                    console.log('检测json数组失败----------');
                }
            };
            const handleChangeDataset = () => {
                emit('handleChangeDataset', { datas: state.datas, keyMap: state.keyMap });
            };
            onMounted(() => {
                state.datas = props.initialDatas;
                state.keyMap = props.initialKeyMap;
            });
            return {
                ...toRefs(state),
                handleClickJia,
                handleClickJian,
                handleChangeValue,
                handleChangeDataset,
            };
        },
    });
</script>

<style lang="scss" scoped></style>
