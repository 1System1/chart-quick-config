import { commafy } from '../../utils';
/**
 * 基础柱形图
 */
export default class BasicBar {
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
                valueFormatter: (value) => {
                    return commafy(value, { digits: 2 });
                },
            },
            xAxis: {
                type: 'category',
            },
            yAxis: {
                type: 'value',
            },
            series: this.getSeries(),
        };
        return option;
    }
    /**
     * 获取系列
     * @returns
     */
    getSeries() {
        let series = [];
        this.valueKeys.forEach((r) => {
            series.push({
                name: r.name,
                type: 'bar',
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
