/* eslint-disable */
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/homePage.vue'),
    },
    {
        path: '/chartEdit/:id',
        name: 'editChart',
        component: () => import('@/views/chartEdit/index.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
