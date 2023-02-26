import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'

import './medium.css'
import './index.css'
import 'element-plus/dist/index.css'

import App from './App.vue'
import PC from './views/PC.vue'
import User from './views/User.vue'
import Mobile from './views/Mobile.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: document.body.offsetWidth < 750 ? Mobile : PC },
        { path: '/user', component: document.body.offsetWidth < 750 ? Mobile : User },
    ]
})

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')