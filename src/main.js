 
 
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
