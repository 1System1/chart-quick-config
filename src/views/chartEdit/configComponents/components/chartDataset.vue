<template>
    <el-collapse-item title="数据" name="dataset">
        <!-- 图形展示数据 -->
        <div class="config-item">
            <div class="config-item-col">
                <span class="config-item-title">展示数据</span>
                <el-input v-model="datas" placeholder="请输入图形展示数据" type="textarea" :autosize="{ minRows: 6, maxRows: 10 }" />
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
        },
        emits: ['handleChangeDataset'],
        setup(props, { emit }) {
            const state = reactive({
                datas: '',
            });

            const handleChangeDataset = () => {
                emit('handleChangeDataset', { datas: state.datas });
            };
            onMounted(() => {
                state.datas = props.initialDatas;
            });
            return {
                ...toRefs(state),
                handleChangeDataset,
            };
        },
    });
</script>

<style lang="scss" scoped></style>
