import { commafy } from '../../utils';
/**
 * 基础K线图
 */
export default class BasicCandlestick {
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
     * @param {*} categoryData
     * @param {*} valueDatas
     * @returns
     */
    getOption() {
        const { valueDatas, categoryData } = this.splitData(this.datas);
        const upColor = '#ec0000';
        const upBorderColor = '#8A0000';
        const downColor = '#00da3c';
        const downBorderColor = '#008F28';
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                },
                valueFormatter: (value) => {
                    return commafy(value, { digits: 2 });
                },
            },
            legend: {
                data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%',
            },
            xAxis: {
                type: 'category',
                data: categoryData,
                boundaryGap: false,
                axisLine: {
                    onZero: false,
                },
                splitLine: {
                    show: false,
                },
                min: 'dataMin',
                max: 'dataMax',
            },
            yAxis: {
                scale: true,
                splitArea: {
                    show: true,
                },
            },
            series: [
                {
                    name: '日K',
                    type: 'candlestick',
                    data: valueDatas,
                    itemStyle: {
                        color: upColor,
                        color0: downColor,
                        borderColor: upBorderColor,
                        borderColor0: downBorderColor,
                    },
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: this.calculateMA(5, valueDatas),
                    smooth: false,
                    showSymbol: false,
                    lineStyle: {
                        opacity: 0.5,
                    },
                },

                {
                    name: 'MA10',
                    type: 'line',
                    data: this.calculateMA(10, valueDatas),
                    smooth: false,
                    showSymbol: false,
                    lineStyle: {
                        opacity: 0.5,
                    },
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: this.calculateMA(20, valueDatas),
                    smooth: false,
                    showSymbol: false,
                    lineStyle: {
                        opacity: 0.5,
                    },
                },
                {
                    name: 'MA30',
                    type: 'line',
                    data: this.calculateMA(30, valueDatas),
                    smooth: false,
                    showSymbol: false,
                    lineStyle: {
                        opacity: 0.5,
                    },
                },
            ],
        };
        return option;
    }
    // 获取数据
    splitData(datas) {
        const [o, c, l, h] = this.valueKeys;
        const categoryData = [];
        const valueDatas = [];
        for (let i = 0; i < datas.length; i++) {
            categoryData.push(datas[i][this.nameKey]);
            // 开盘，闭盘，最高，最低
            valueDatas.push([datas[i][o.field], datas[i][c.field], datas[i][h.field], datas[i][l.field]]);
        }
        return {
            valueDatas,
            categoryData,
        };
    }
    // 计算平均值
    calculateMA(dayCount, datas) {
        let result = [];
        for (let i = 0, len = datas.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            let sum = 0;
            for (let j = 0; j < dayCount; j++) {
                sum += datas[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }
}
