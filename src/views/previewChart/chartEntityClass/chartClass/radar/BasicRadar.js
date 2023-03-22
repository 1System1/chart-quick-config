/**
 * 基础柱形图
 */
export default class BasicRadar {
    datas = []; // 数据
    config = []; // 配置
    nameKey = ''; // 类目轴
    valueKeys = []; // 数值
    constructor({ datas, config }) {
        this.datas = datas;
        this.config = config;
        const { nameKey, valueKeys } = config.keyMap;
        this.nameKey = nameKey;
        this.valueKeys = valueKeys;
    }
    getOption() {
        let option = {
            legend: {
                show: this.valueKeys.length > 1,
                data: this.valueKeys.map((r) => r.name),
                bottom: 20,
            },
            radar: {
                // shape: 'circle',
                indicator: this.datas.map((r) => {
                    return {
                        name: r[this.nameKey],
                    };
                }),
            },
            series: [
                {
                    name: '',
                    type: 'radar',
                    data: this.getData(),
                },
            ],
        };

        return option;
    }
    getData() {
        let datas = [];
        this.valueKeys.forEach((r) => {
            datas.push({
                value: this.datas.map((row) => row[r.field]),
                name: r.name,
                ...r,
            });
        });
        return datas;
    }
}
