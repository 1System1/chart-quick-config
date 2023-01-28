/*
 * @Author: shj shj@cnbisoft.com
 * @Date: 2022-08-29 10:33:22
 * @LastEditors: shj shj@cnbisoft.com
 * @LastEditTime: 2023-01-06 18:03:00
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
// 自定义组件
import { setupCustomComponents } from '@/components/customComponents';
 // 自定义样式
import "./assets/style/index"


 
const app = createApp(App)
setupCustomComponents(app);
app.use(store).use(ElementPlus, {
    size: 'small',
  }).use(router).mount('#app')
