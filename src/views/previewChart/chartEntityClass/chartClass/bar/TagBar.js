import { commafy } from '../../utils';
/**
 * 标记图
 */
export default class TagBar {
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
     */
    getOptions() {
        const [k1, k2, k3] = this.valueKeys;
        let row = this.datas.length ? this.datas[0] : {};
        let data = this.getChartData([k1, k2, k3], row);
        let indicatorType = k2.indicatorType;
        indicatorType = typeof indicatorType == 'undefined' ? 1 : indicatorType;
        const [val1, val2, val3] = data;
        let xDatas = [k1.name, '', k3.name];
        let maxVal = Math.max(val1, val3);
        var option = {
            grid: {
                containLabel: true,
            },

            tooltip: {
                show: true,
                formatter: (params) => {
                    if (!params.componentSubType) return '';
                    return `${params.name}：${commafy(params.value, { digits: 2 })}`;
                },
            },

            xAxis: [
                {
                    type: 'category',
                    data: xDatas,
                    axisTick: {
                        show: false,
                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                },
            ],
            series: [
                {
                    type: 'bar',
                    data: [
                        {
                            value: val1,
                            itemStyle: {
                                color: val1 ? '#5470c6' : '#ffb248',
                            },
                            label: {
                                position: val1 < 0 ? 'bottom' : 'top',
                            },
                        },
                        null,
                        {
                            value: val3,
                            itemStyle: {
                                color: val3 ? '#fac858' : '#ffb248',
                            },
                            label: {
                                position: val3 < 0 ? 'insideBottom' : 'top',
                            },
                        },
                    ],
                    barMinHeight: 5,
                    barMaxWidth: 60,
                    label: {
                        show: true,
                        // position: 'top',
                        formatter: (params) => {
                            if (!params.value) return '暂无数据';
                            return commafy(params.value, { digits: 2 });
                        },
                    },
                    markPoint: val2 && val3 ? this.getMorkPoint(indicatorType, maxVal, val2, k2.subfix) : null,
                },
            ],
        };
        return option;
    }
    /**
     * 处理图形数据
     * @param {*} param0
     * @param {*} row
     * @returns
     */
    getChartData([k1, k2, k3], row) {
        let val1 = row[k1.field] || 0;
        let val3 = row[k3.field] || 0;
        let val2 = row[k2.field] || 0;
        if (k2.formulaType == 'zjl') {
            //增减率
            val2 = !val1 ? 0 : ((val3 - val1) / Math.abs(val1)) * 100;
        } else if (k2.formulaType == 'zje') {
            // 增减额
            val2 = val3 - val1;
        }
        return [val1, val2, val3];
    }

    /**
     *
     * @param {*} type  1正向指标 0 反向指标
     * @param {*} yVal  y轴位置
     * @param {*} val   值
     */
    getMorkPoint(type, yVal, val, subfix = '') {
        let symbol = '';
        let color = '';
        let upSymbol = 'path://M13.811,7h3.918L10.874,0,4.021,7H8.036c0,5-1.568,8.5-4.993,11C7.937,17,12.833,14,13.811,7Z';
        let downSymbol = 'path://M13.811,11h3.918l-6.855,7L4.021,11H8.036c0-5-1.568-8.5-4.993-11C7.937,1,12.833,4,13.811,11Z';
        let upColor = '#22C72D';
        let downColor = '#ff2814';
        if (!val) return null;
        symbol = val > 0 ? upSymbol : downSymbol;
        if (type) {
            // 正向指标
            color = val > 0 ? upColor : downColor;
        } else {
            // 反向指标
            color = val > 0 ? downColor : upColor;
        }
        return {
            data: [
                {
                    coord: [1, yVal],
                    symbolOffset: [0, 20],
                    symbol: symbol,
                    itemStyle: {
                        color: color,
                    },
                    value: commafy(val, { digits: 2 }) + subfix,
                    label: {
                        position: ['20%', '10%'],
                        color: '#333',
                    },
                },
            ],
        };
    }
}
