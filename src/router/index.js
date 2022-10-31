 
/* eslint-disable */
import { createRouter, createWebHashHistory } from 'vue-router'
 
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import( '@/views/Index.vue')
   },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('@/views/editChart/EditIndex.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
