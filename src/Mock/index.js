/**
 * 导出图形json
 * @returns
 */
export function getAllChartJson() {
    /* eslint-disable */
    const JSON = require.context('./', true, /\.json$/);
    return JSON.keys().map(JSON);
}
