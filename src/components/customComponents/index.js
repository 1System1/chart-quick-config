/*
 * @Author: shj shj@cnbisoft.com
 * @Date: 2022-09-29 14:17:08
 * @LastEditors: shj shj@cnbisoft.com
 * @LastEditTime: 2023-01-28 15:20:27
 * @FilePath: \chart-quick-config\src\components\customComponents\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 加载自定义组件
 * @param app
 */
export function setupCustomComponents(app) {
    // 加载组件
    /* eslint-disable */
    const Components = require.context('.', true, /\.vue$/);
    Components.keys()
        .map(Components)
        .forEach((item) => {
            if (item.default.name  ) {
                app.component(item.default.name, item.default);
            }
        });
}
