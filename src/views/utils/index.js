import numberCommafy from "./commafy"
/**
 *获取根据数值获取颜色
 * @param {*} value 数值
 * @param {*} month 月份
 * @returns
 */
 export function getColor(value, month) {
    // 颜色

    let colors = ['#F38181', '#FCE38A', '#EAFFD0', '#95E1D3'];
    // 区间坐标
    let index = getIndex(value, month);
    // 返回颜色值
    return colors[index];
}
// 区间坐标
export function getIndex(value, month) {
    
    // 获取区间范围
    let rang = getRangs(month);
    // 查找第一个大于value的坐标
    let index = rang.findIndex((r) => r > value);
    // 未找到：说明超出最大值，默认最后一个
    if (index < 0) index = 3;
    return index;
}
/**
 * 获取范围
 * @param {*} month
 * @returns
 */
export function getRangs(month=6) {////[25,50,75,100]
    debugger
    let val = Math.floor((month / 12) * 100); // 向下取整 ：当前月/12*100
    let val1 = Math.floor(val / 2); // 向下取整：(当前月/12*100)/2
    let val2 = val * 2; // (当前月/12*100)*2
    let val3 = val + val1; // (当前月/12*100) + ((当前月/12*100)/2)
    // 排序 从小到大排序
    let valRang = [val1, val, val3, val2].sort((a, b) => a - b);
    return valRang;
}

/**
 * 数字格式化
 * @param {*} number 
 * @param {*} options 
 * @returns 
 */
export function commafy(number,options){
   return numberCommafy(number,options)
}