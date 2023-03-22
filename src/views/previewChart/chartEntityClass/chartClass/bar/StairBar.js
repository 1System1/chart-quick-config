import { commafy } from '../../utils';
/**
 * 瀑布图
 */
export default class StairBar {
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
        let datas = this.datas.map((r) => r[this.valueKeys[0].field]);
        let seriesData = datas.concat(); // 数据处理过程中用到的数据，值会做改变
        let helpValus = this.getAllHelpValue(seriesData);
        let option = {
            xAxis: {
                type: 'category',
                data: this.datas.map((r) => r[this.nameKey]),
            },
            yAxis: {
                type: 'value',
            },

            series: [
                {
                    name: 'Placeholder',
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: {
                        borderColor: 'transparent',
                        color: 'transparent',
                    },
                    emphasis: {
                        itemStyle: {
                            borderColor: 'transparent',
                            color: 'transparent',
                        },
                    },
                    data: helpValus,
                },
                {
                    name: 'Income',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                        show: true,
                        position: 'top',
                        formatter: (params) => {
                            return commafy(datas[params.dataIndex], { digits: 2 });
                        },
                    },
                    data: seriesData,
                },
            ],
        };

        return option;
    }
    // 判断两个数据是不是一正一负
    isSymbolConsistent(data1, data2) {
        return data1 * data2 < 0;
    }

    // 获取当前值颜色,是否变红，绝对值
    getValueColor(value, red, abs) {
        let obj = {
            value: abs ? Math.abs(value) : value,
            itemStyle: {
                color: '#a90000',
            },
            label: {
                position: 'bottom',
            },
        };

        return red ? obj : value;
    }
    // 获取所有辅助值
    getAllHelpValue(data) {
        let helpValus = [];
        let NumberSums = [];
        let NumberSum = 0;
        data.forEach((cell, index) => {
            if (index === 0) {
                helpValus.push(0); // 第一个辅助值为0
                NumberSum += cell;
                NumberSums.push(NumberSum);
                if (data[index] < 0) data[index] = this.getValueColor(data[index], true, false);
            } else if (this.isSymbolConsistent(NumberSum, cell)) {
                // 一正一负
                if (NumberSum < 0 && Math.abs(NumberSum) > cell) {
                    // 前面和<0,当前值大于0.相加之后还是小于0
                    helpValus.push(NumberSum + cell);
                    data[index] = -cell;
                } else if (NumberSum < 0 && Math.abs(NumberSum) < cell) {
                    // 前面和<0,当前值大于0.相加之后还是大于0
                    helpValus.push(0);
                    data[index] = NumberSum + cell;
                    NumberSum += cell;
                    NumberSums.push(NumberSum);
                } else if (NumberSum > 0 && NumberSum > Math.abs(cell)) {
                    // 和大于0， 当前值小于0 ,相加之后大于0
                    helpValus.push(NumberSum + cell);
                    data[index] = -cell;
                    NumberSum += cell;
                    data[index] = this.getValueColor(data[index], true, false);
                } else if (NumberSum > 0 && cell < 0) {
                    helpValus.push(0); // 辅助值为 0
                    data[index] = NumberSum + cell;
                    NumberSum += cell;
                    NumberSums.push(NumberSum);
                    data[index] = this.getValueColor(data[index], true, false);
                } else {
                    helpValus.push(0); // 辅助值为 0
                    data[index] = NumberSum + cell;
                    NumberSum += cell;
                    NumberSums.push(NumberSum);
                    data[index] = this.getValueColor(data[index]);
                }
            } else if (!this.isSymbolConsistent(NumberSum, cell)) {
                // 符号相同
                helpValus.push(NumberSum);
                NumberSum += cell;
                NumberSums.push(NumberSum);
                if (data[index] < 0) data[index] = this.getValueColor(data[index], true, false);
            }
        });
        return helpValus;
    }
}
