import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import {get_ip_saved} from './../composable/ipLocalStorage'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/setting-ip',
        name: 'IpSettings',
        component: () => import(/* webpackChunkName: "about" */ '../views/SettingIp.vue')
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

//Navigation Guards
router.beforeEach((to, from, next) => {
    if (to.name !== 'IpSettings' && !get_ip_saved()){
        next({ name: 'IpSettings' })
    }
    else{
        next()
    }
})
export default router
