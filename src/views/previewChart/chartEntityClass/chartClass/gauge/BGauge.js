import { commafy, getGaugeMaxMin } from '../../utils';

/**
 * 仪表盘
 */
export default class BGauge {
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
        let colors = this.getColors(value);
        const { max, min } = getGaugeMaxMin(value);

        let option = {
            series: [
                {
                    type: 'pie',
                    name: '外圆环',
                    radius: ['72%', '77%'],
                    center: ['50%', '60%'],
                    animation: false,
                    itemStyle: {
                        color: colors[1],
                    },
                    label: {
                        show: false,
                    },
                    emphasis: {
                        disabled: true,
                    },
                    data: [100],
                },
                {
                    // 内圆环
                    name: '',
                    type: 'pie',
                    radius: ['55%', '65%'],
                    center: ['50%', '60%'],

                    clockwise: true,
                    startAngle: 225,
                    animation: false,
                    z: 0,
                    zlevel: 0,

                    label: {
                        show: true,
                        position: 'center',
                        fontSize: 24,
                        color: '#FFB124',
                        fontWeight: 'bold',
                        formatter: () => {
                            return commafy(value, { digits: 2 });
                        },
                    },
                    emphasis: {
                        disabled: true,
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        {
                            // 有颜色
                            name: '',
                            itemStyle: {
                                color: colors[0],
                            },

                            value: value <= 0 ? 0 : value,
                        },
                        {
                            // 辅助
                            name: '',
                            itemStyle: {
                                color: '#E5E5E5',
                            },

                            value: value <= 0 ? max : max - value,
                        },
                        {
                            // 辅助圆环
                            name: '',

                            value: max * (1 / 3),
                            itemStyle: {
                                color: '#E5E5E5',
                            },
                        },
                    ],
                },
                {
                    // 刻度
                    type: 'gauge',
                    radius: '68%',
                    center: ['50%', '60%'],
                    clockwise: true,
                    startAngle: 225,
                    endAngle: -45,
                    splitNumber: 2,
                    max,
                    min,
                    animation: false,
                    axisTick: {
                        show: true,
                    },
                    splitLine: {
                        show: false,
                        length: 14,
                        distance: 4,
                        lineStyle: {
                            width: 2,
                            color: '#fff',
                        },
                    },
                    axisLabel: {
                        show: true,
                        formatter: function (value) {
                            return commafy(value, { digits: 2 });
                        },
                    },
                    pointer: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    detail: {
                        show: false,
                    },
                },
            ],
        };
        return option;
    }
    /**
     * 获取颜色
     * @param {*} value
     * @returns
     */
    getColors(value) {
        // [内圈颜色,外圈颜色]
        let colors = [
            ['#F79292', '#FF5F5F'],
            ['#FFE3A6', '#FFC73B'],
            ['#A4EFFC', '#37BFEF'],
            ['#A6DFC5', '#6ACA9E'],
        ];
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
