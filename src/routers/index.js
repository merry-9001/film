import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema'
import adminRouter from './admin'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    // base: 'film',
    routes: [
        movieRouter,
        mineRouter,
        cinemaRouter,
        adminRouter,
        // {
        //     path: '/*',
        //     redirect: '/movie'
        // }
    ]
})