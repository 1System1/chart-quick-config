 
/**
 * 导出系统默认图形json
 * @returns 
 */
export function getDefaultChartJson() {
   
    /* eslint-disable */
    const defalutJson = require.context('./default', true, /\.json$/);
    const customJson = require.context('./custom', true, /\.json$/);
    let defaultChart = defalutJson.keys().map(defalutJson)
    let customChart = customJson.keys().map(customJson)
    return defaultChart.concat(customChart)
}