import ChartClass from './chartClass';
// 所有图形都走此方法
export default class ChartConfig {
    chartType = ''; // 图形类型
    datas = []; // 数据
    config = null; // 配置
    option = null; // 最终生成的图形配置
    constructor(chartType, datas, config) {
        this.chartType = chartType;
        this.datas = datas;
        this.config = config;
    }
    // 基础柱形图
    getOption() {
        let params = { datas: this.datas, config: this.config };
        let option = null;
        try {
            let chartType = this.chartType.slice(0, 1).toUpperCase() + this.chartType.slice(1);
            option = new ChartClass[chartType](params).getOption();
        } catch (e) {
            console.error(`${this.chartType}---获取图形配置失败---------------'`, e);
        }
        return option;
    }
}
