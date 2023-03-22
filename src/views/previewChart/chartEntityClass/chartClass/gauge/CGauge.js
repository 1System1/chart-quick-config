import { commafy, getGaugeMaxMin } from '../../utils';

/**
 * 仪表盘
 */
export default class CGauge {
    datas = []; // 数据
    config = []; // 配置
    nameKey = ''; // 类目轴
    valueKey = []; // 数值
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
        let value = 0;
        if (this.datas.length) {
            value = this.datas[0][this.valueKey] || 0;
        }
        const { datas } = this.getChartParams(value);
        const { max, min } = getGaugeMaxMin(value);
        let option = {
            series: [
                {
                    type: 'pie',
                    radius: '90%',
                    center: ['50%', '70%'],
                    startAngle: 0, // 起始角度0
                    clockwise: false, // 逆时针
                    emphasis: {
                        disabled: true,
                    },
                    label: { show: false },
                    data: datas,
                },
                {
                    // 仪表盘
                    zlevel: 2,
                    min: min,
                    max: max,
                    type: 'gauge',
                    startAngle: 180,
                    endAngle: 0,
                    radius: '90%',
                    center: ['50%', '70%'],
                    clockwise: true,
                    animation: false,
                    splitNumber: 4,
                    data: [
                        {
                            value: value,
                            name: '',
                        },
                    ],
                    axisTick: {
                        show: true,
                        distance: 2,
                        width: 2,
                        lineStyle: {
                            color: '#333',
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        distance: -45,
                        padding: [12, -20, 20, -10],

                        formatter: function (value) {
                            return commafy(value, { digits: 2 });
                        },
                    },
                    pointer: {
                        show: true,
                        itemStyle: {
                            // 指针颜色
                            color: '#F75840',
                        },
                    },
                    anchor: {
                        show: true,
                        showAbove: true,
                    },
                    axisLine: {
                        show: true,
                        roundCap: true,
                        lineStyle: {
                            width: 2,
                            color: [[1, '#4F5F6B']],
                        },
                    },
                    detail: {
                        show: true,
                        fontSize: 24,
                        color: '#FFB124',
                        fontWeight: 'bold',
                        offsetCenter: [0, '35%'],
                        formatter: (value) => {
                            return commafy(value, { digits: 2 });
                        },
                    },
                },
            ],
        };
        return option;
    }
    /**
     *
     * @param {*} value
     * @param {*} inverseIndicator 反向指标
     * @returns
     */
    getChartParams(value, inverseIndicator) {
        let colors = ['#fff', '#FF7373', '#FFE197', '#D9FFD9', '#89EFE3'];
        if (inverseIndicator) {
            colors.reverse();
            colors.unshift('#fff');
        }
        let vals = [25, 25, 25, 25, 100];

        let minVal = 0;
        let maxVal = vals[4];

        if (value > vals[4]) {
            // 超出范围最大值
            maxVal = value % 10 ? Math.ceil(value / 10) * 10 : value; //
            vals[3] = maxVal - vals[4] + vals[3]; //饼图第一个区域
            vals[4] = maxVal; //// 饼图最后一个区域
        }
        if (value < 0) {
            // 值小于0
            minVal = value % 10 ? Math.ceil(Math.abs(value) / 10) * -10 : value;
            vals[0] = vals[0] - minVal;
            vals[4] = vals[4] - minVal;
        }

        let datas = [
            {
                name: '',
                value: vals[3],
                itemStyle: {
                    color: colors[4],
                },
            },
            {
                name: '',
                value: vals[2],
                itemStyle: {
                    color: colors[3],
                },
            },
            {
                name: '',
                value: vals[1],
                itemStyle: {
                    color: colors[2],
                },
            },
            {
                name: '',
                value: vals[0],
                itemStyle: {
                    color: colors[1],
                },
            },
            {
                name: '',
                value: vals[4],
                itemStyle: {
                    color: colors[0],
                },
            },
        ];
        return { datas, minVal, maxVal };
    }
}
