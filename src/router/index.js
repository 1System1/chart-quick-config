/*
 * @Author: shj shj@cnbisoft.com
 * @Date: 2022-08-29 10:33:22
 * @LastEditors: shj shj@cnbisoft.com
 * @LastEditTime: 2022-12-30 17:28:59
 * @FilePath: \chart-quick-config\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
 
/* eslint-disable */
import { createRouter, createWebHashHistory } from 'vue-router'
 
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import( '@/views/Index.vue')
   },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
