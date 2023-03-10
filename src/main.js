import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css';
// 自定义组件
import { setupCustomComponents } from '@/components/customComponents';
// 自定义样式
import './assets/style/index';
// 插件
const app = createApp(App);
setupCustomComponents(app);

app.use(store)
    .use(ElementPlus, {
        size: 'default',
    })
    .use(router)
    .mount('#app');
