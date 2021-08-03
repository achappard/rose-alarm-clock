import {createRouter, createWebHistory} from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import {GET_IP_CLOCK} from "../store/mutation-types";
import {IP_CLOCK_MODULE} from "../store/namespaces";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/setting-ip',
        name: 'IpSettings',
        component: () => import(/* webpackChunkName: "setting-ip" */ '../views/SettingIp.vue')
    },
    { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue') 
    },
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

//Navigation Guards
router.beforeEach((to, from, next) => {
    const ip_from_store = store.getters[`${IP_CLOCK_MODULE}${GET_IP_CLOCK}`]
    if (to.name !== 'IpSettings' && !ip_from_store) {
        next({name: 'IpSettings'})
    } else if (to.name === 'IpSettings' && ip_from_store) {
        next({name: 'Home'})
    } else {
        next()
    }
})
export default router
