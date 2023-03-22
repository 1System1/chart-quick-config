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
            if (item.default.name) {
                app.component(item.default.name, item.default);
            }
        });
}
