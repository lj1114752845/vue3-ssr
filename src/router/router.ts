/*
* 作者：李健
* 邮箱：lj2690@163.com
* */

import {createMemoryHistory, createRouter, createWebHistory, type RouteRecordRaw} from "vue-router";
import HomeView from "../pages/HomeView.vue";
import UserView from "../pages/UserView.vue";
import InfoView from "../pages/InfoView.vue";

const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: '/',
        component: HomeView,
    },
    {
        path: '/user',
        component: UserView,
    },
    {
        path: '/info',
        component: InfoView,
    }
];


export function createAppRouter() {
    return createRouter({
        routes: routes,
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    });
}