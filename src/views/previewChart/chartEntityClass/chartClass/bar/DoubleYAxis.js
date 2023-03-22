import { commafy } from '../../utils';
/**
 * 双轴图
 */
export default class DoubleYAxis {
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
            dataset: this.getDataset(),
            grid: {
                containLabel: true,
            },
            tooltip: {
                trigger: 'axis',
                valueFormatter: (value) => {
                    return commafy(value, { digits: 2 });
                },
            },

            xAxis: {
                type: 'category',
            },
            yAxis: [
                {
                    type: 'value',
                },
                {
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                },
            ],

            series: this.getSeries(),
        };

        return option;
    }

    getSeries() {
        let series = [];
        this.valueKeys.forEach((r) => {
            series.push({
                name: r.name,
                type: r.serieType, // 系列类型  bar/line
                yAxisIndex: r.yAxisIndex, // y轴坐标 0/1
                encode: {
                    y: r.field,
                },
            });
        });
        return series;
    }
    /**
     * 获取数据集
     */
    getDataset() {
        let source = this.datas.map((r) => {
            return {
                product: r[this.nameKey],
                ...r,
            };
        });
        return {
            source,
        };
    }
}
