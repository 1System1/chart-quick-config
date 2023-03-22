import numberCommafy from './commafy';
/**
 * 获取仪表盘最大最小值:默认区间0-100
 * @param {*} value
 * @returns
 */
export function getGaugeMaxMin(value) {
    let max = 100;
    let min = 0;
    if (value > 100) {
        max = Math.ceil(value / 10) * 10; // 向上取10的倍数
    } else if (value < 0) {
        min = Math.floor(value / 10) * 10; // 向下取10的倍数
        max = 0;
    }
    return { max, min };
}
/**
 * 数字格式化
 * @param {*} number
 * @param {*} options
 * @returns
 */
export function commafy(number, options) {
    return numberCommafy(number, options);
}
