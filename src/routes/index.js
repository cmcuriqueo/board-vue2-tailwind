import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Board from './../components/Board.vue'
const routes = [
    { path: '/', component: Board }
]
const router = new VueRouter({
    routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    const authRequired = true;
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        next()
        //por ahora
        return
    }

    next()
})



export default router;