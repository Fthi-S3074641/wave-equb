import Vue from 'vue'
import Vrouter from 'vue-router'

import welcome from './../views/welcome'
import newUser from './../views/newUser'

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
            children: [
                {
                    path: '/newUser',
                    name: '/newUser',
                    component: newUser
                }
            ]
        },
        {
            path: '/welcome',
            name: '/welcome',
            component: welcome
        }
    ],
    mode: 'history'
})