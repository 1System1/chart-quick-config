import { commafy } from '../../utils';

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
        let max = 100;
        let color = this.getColors(value);
        if (this.datas.length) {
            value = this.datas[0][this.valueKey] || 0;
        }
        if (value > max) {
            max = value % 10 ? Math.ceil(Math.abs(value) / 10) * 10 : value;
        }
        let option = {
            series: [
                {
                    // 内圆环
                    name: '',
                    type: 'pie',
                    radius: ['70%', '78%'],
                    center: ['50%', '60%'],
                    zlevel: 1,
                    silent: true,
                    clockwise: false,
                    animation: false, // 去掉动画
                    startAngle: 270,

                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        {
                            name: '', // 辅助值
                            value: value <= 0 ? 150 : max / (3 / 4) - value,
                            itemStyle: {
                                color: '#D7D7DE',
                            },
                        },
                        {
                            name: '',
                            itemStyle: {
                                color: color,
                            },
                            value: value <= 0 ? 0 : value,
                        },
                    ],
                },
                {
                    // 刻度
                    type: 'gauge',
                    radius: '80%',
                    zlevel: 2,
                    center: ['50%', '60%'],
                    clockwise: true,
                    startAngle: 270,
                    endAngle: 0,
                    min: 0,
                    max: max, // 30的倍数 最小值150
                    splitNumber: 3,
                    axisTick: {
                        show: true,
                        width: 2,
                        splitNumber: 10,
                        lineStyle: {
                            color: '#333',
                        },
                    },
                    splitLine: {
                        show: true,
                    },
                    axisLabel: {
                        show: true,
                        distance: 14,
                        color: '#333',
                        fontWeight: 'bold',
                        formatter: function (value) {
                            return commafy(value, { digits: 2 });
                        },
                    },
                    pointer: {
                        show: true,
                        width: 4,
                        icon: 'rect',
                        length: '50%',
                        itemStyle: {
                            color: color,
                        },
                    },
                    anchor: {
                        show: true,
                        showAbove: true,
                        itemStyle: {
                            color: '#FF0000',
                            borderCap: 'butt',
                        },
                    },
                    data: [
                        {
                            name: '',
                            value: value,
                        },
                    ],
                    axisLine: {
                        show: false,
                    },
                    detail: {
                        show: true,
                        fontSize: 14,
                        color: '#FFB124',
                        padding: [0, 0, 0, 10],
                        formatter: (val) => {
                            return commafy(val, { digits: 2 });
                        },
                    },
                },
            ],
        };
        return option;
    }
    /**
     * 获取图形颜色
     * @param {*} value
     * @returns
     */
    getColors(value) {
        let colors = ['#FF5F5F', '#FFC73B', '#37BFEF', '#6ACA9E'];
        let index = 0;
        if (value <= 25) {
            index = 0;
        } else if (value <= 50) {
            index = 1;
        } else if (value <= 75) {
            index = 2;
        } else {
            index = 3;
        }
        return colors[index];
    }
}
