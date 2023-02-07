 
 
/* eslint-disable */
import { createRouter, createWebHashHistory } from 'vue-router'
 
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import( '@/views/homePage.vue')
   },
   {
    path:'/chartEdit/:id',
    name:'editChart',
    component:()=>import("@/views/editComponents/chartEdit.vue")
   }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
