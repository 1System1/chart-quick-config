/*
 * @Author: shj shj@cnbisoft.com
 * @Date: 2022-08-29 10:33:22
 * @LastEditors: shj shj@cnbisoft.com
 * @LastEditTime: 2022-12-28 14:15:01
 * @FilePath: \chart-quick-config\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
 
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css';
import { setupCustomComponents } from '@/components/customComponents';

const app = createApp(App)
setupCustomComponents(app);
app.use(store).use(ElementPlus, {
    size: 'small',
  }).use(router).mount('#app')
