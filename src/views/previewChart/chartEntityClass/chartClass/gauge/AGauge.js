import { commafy, getGaugeMaxMin } from '../../utils';
import * as ECharts from 'echarts';
/**
 * 仪表盘
 */
export default class AGauge {
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
        const { max, min } = getGaugeMaxMin(value);
        let colors = ['#FA5F5A', '#FFBA2F', '#D1DB74', '#72D39E'];
        if (value < 0) {
            colors.reverse();
        }
        let index = 0;
        let rate = value / (max - min);
        if (rate <= 0.35) {
            index = 0;
        } else if (rate <= 0.55) {
            index = 1;
        } else if (rate <= 0.65) {
            index = 2;
        } else index = 3;
        let color = colors[index];
        let highlight = new ECharts.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [
                {
                    offset: 0.1,
                    color: '#FA5F5A', // 50% 处的颜色
                },
                {
                    offset: 0.2,
                    color: '#FFB124', // 50% 处的颜色
                },

                {
                    offset: 0.6,
                    color: '#FFDE5F', // 50% 处的颜色
                },
                {
                    offset: 1,
                    color: '#65D2A3', // 50% 处的颜色
                },
            ],
            false
        );
        let option = {
            angleAxis: {
                max: 100,
                startAngle: -45,
                clockwise: false,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
            radiusAxis: {
                type: 'category',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
            polar: {
                center: ['50%', '60%'],
                radius: '170%',
            },
            series: [
                {
                    // 内圆
                    zlevel: 4,
                    type: 'pie',
                    radius: ['40%', '50%'],
                    center: ['50%', '60%'],
                    silent: true, // 不响应鼠标
                    data: [
                        {
                            value: 0,
                            itemStyle: {
                                color: '#E5EBF4',
                            },
                            label: {
                                show: true,
                                position: 'center',
                                fontSize: 24,
                                // color: getColor(value),
                                color: color,
                                fontWeight: 'bold',
                                formatter: () => {
                                    return commafy(value, { digits: 2 });
                                },
                            },
                            labelLine: {
                                smooth: true,
                                lineStyle: {
                                    width: 0,
                                },
                            },
                            hoverAnimation: false,
                        },
                    ],
                    animation: false,
                },
                {
                    // 内圆白底
                    zlevel: 3,
                    type: 'pie',
                    radius: '40%',
                    center: ['50%', '60%'],
                    silent: true, // 不响应鼠标
                    data: [
                        {
                            value: 0,
                            itemStyle: {
                                color: '#fff',
                            },
                        },
                    ],
                    animation: false,
                },

                {
                    name: '内部进度条',
                    type: 'gauge',
                    center: ['50%', '60%'],
                    radius: '90%',
                    splitNumber: 10,
                    max,
                    min,
                    startAngle: 225,
                    endAngle: -45,
                    axisLine: {
                        lineStyle: {
                            color: [[1, highlight]],
                            width: 10,
                        },
                    },
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
                    },
                    splitLine: {
                        show: false,
                    },

                    axisLabel: {
                        show: true,
                        distance: 0,
                        formatter: function (value) {
                            return commafy(value, { digits: 2 });
                        },
                    },
                    pointer: {
                        show: true,
                        width: 18,
                        length: '70%',
                        itemStyle: {
                            color: color,
                        },
                    },

                    detail: {
                        show: false,
                    },
                },
            ],
        };
        return option;
    }
}
