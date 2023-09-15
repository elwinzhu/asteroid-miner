import Vue from 'vue'
import VueRouter from 'vue-router'
import MainScreens from "../views/MainScreens";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainScreens
    },
    {
        path: '/bonus-screens',
        name: 'bonus',
        component: () => import('../views/BonusScreens.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router
