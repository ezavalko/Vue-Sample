import Router from 'vue-router'
import AuthGuard from '../router/auth-guard'
import Message from '../components/Pages/Message'
import Graph from '../components/Pages/Graph'
import Trello from '../components/Pages/Trello'
import Status from '../components/Pages/Status'
import Home from '../components/Pages/Home'
import Login from '../components/Pages/Login'
import Registration from '../components/Pages/Registration'

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            beforeEnter: AuthGuard
        },
        {
            path: '/status',
            name: 'Status',
            component: Status,
            beforeEnter: AuthGuard
        },
        {
            path: '/trello',
            name: 'Trello',
            component: Trello,
            beforeEnter: AuthGuard
        },
        {
            path: '/graph',
            name: 'Graph',
            component: Graph,
            beforeEnter: AuthGuard
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/registration',
            name: 'Registration',
            component: Registration
        },
        {
            path: '/message',
            name: 'Message',
            component: Message,
            beforeEnter: AuthGuard
        }
    ],
    mode: 'history'
})
