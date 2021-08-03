import {createRouter, createWebHistory} from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'

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
    if (to.name !== 'IpSettings' && !store.getters.getIpClock) {
        next({name: 'IpSettings'})
    } else if (to.name === 'IpSettings' && store.getters.getIpClock) {
        next({name: 'Home'})
    } else {
        next()
    }
})
export default router
