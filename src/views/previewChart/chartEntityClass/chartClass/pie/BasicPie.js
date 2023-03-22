import { commafy } from '../../utils';
/**
 * 基础饼图
 */
export default class BasicPie {
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
    /**
     * 获取图形配置
     * @returns
     */
    getOption() {
        let option = {
            tooltip: {
                trigger: 'item',
                valueFormatter: (value) => {
                    return commafy(value, { digits: 2 });
                },
            },
            series: {
                type: 'pie',
                radius: '65%',
                label: {
                    formatter: '{b}: {d}%',
                },
                data: this.datas.map((r) => {
                    return {
                        name: r[this.nameKey],
                        value: r[this.valueKeys[0].field],
                        ...r,
                    };
                }),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        };

        return option;
    }
}
