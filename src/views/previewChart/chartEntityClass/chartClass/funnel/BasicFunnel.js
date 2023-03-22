import { commafy } from '../../utils';
/**
 * 基础漏斗图
 */
export default class BasicFunnel {
    datas = []; // 数据
    config = []; // 配置
    nameKey = ''; // 类目轴
    valueKey = ''; // 数值
    constructor({ datas, config }) {
        this.datas = datas;
        this.config = config;
        const { nameKey, valueKey } = config.keyMap;
        this.nameKey = nameKey;
        this.valueKey = valueKey;
    }
    /**
     * 获取图形配置
     * @returns
     */
    getOption() {
        let option = {
            tooltip: {
                valueFormatter: (value) => {
                    return commafy(value, { digits: 2 });
                },
            },
            legend: {
                data: this.datas.map((r) => {
                    return r[this.nameKey];
                }),
                bottom: 4,
            },
            series: [
                {
                    type: 'funnel',
                    left: '10%',
                    top: 40,
                    bottom: 40,
                    width: '75%',
                    label: {
                        show: false,
                        position: 'inside',
                    },
                    data: this.datas.map((r) => {
                        return {
                            name: r[this.nameKey],
                            value: r[this.valueKey],
                            ...r,
                        };
                    }),
                },
            ],
        };
        return option;
    }
}
