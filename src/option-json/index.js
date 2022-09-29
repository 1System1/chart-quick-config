/*
 * @Author: shj shj@cnbisoft.com
 * @Date: 2022-09-29 15:55:27
 * @LastEditors: shj shj@cnbisoft.com
 * @LastEditTime: 2022-09-29 16:46:31
 * @FilePath: \chart-quick-config\src\option-json\default\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 导出系统默认图形json
 * @returns 
 */
export function getDefaultChartJson() {
   
    /* eslint-disable */
    const JSONS = require.context('./default', true, /\.json$/);
    return JSONS.keys().map(JSONS)
}