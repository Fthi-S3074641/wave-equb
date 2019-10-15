import Vue from 'vue'
import Vrouter from 'vue-router'

import welcome from './../views/welcome'
import newUser from './../views/newUser'
import dashboard from './../views/dashboard'

Vue.use(Vrouter)

export default new Vrouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
      },
    routes: [
        {
            path: '/',
            name: '/home',
            component: welcome,
        },
        {
            path: '/newUser',
            name: '/newUser',
            component: newUser
        },
        {
            path: '/dashboard',
            name: '/dashborad',
            component: dashboard,
            props: true
 
        },
        {
            path: '/welcome',
            name: '/welcome',
            component: welcome
        }
    ],
    mode: 'history'
})