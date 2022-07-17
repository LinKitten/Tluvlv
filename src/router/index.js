import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: '',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/loginView.vue')
    },{
        path:'/home',
        name:'home',
        component:()=>import('../views/homeView.vue')
    },{
        path:'/strategy',
        name:'strategy',
        component:()=>import('../views/strategy/strategyView.vue')
    },{
        path:'/diary',
        name:'diary',
        component:()=>import('../views/diary/diaryView.vue')
    },{
        path:'/destination',
        name:'destination',
        component:()=>import('../views/destination/destinationView.vue')
    },{
        path:'/diaryContent',
        name:"diaryContent",
        component:()=>import('../views/diary/diaryContent.vue')
    },{
        path:"/pushDiary",
        name:"pushDiary",
        component:()=>import('../views/diary/pushDiary.vue')
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
