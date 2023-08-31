import { createRouter, createWebHistory } from 'vue-router'

import emptyLayout from "@/layout/empty-layout.vue"
import basicLayout from "@/layout/basic-layout.vue"
import home from "@/views/home.vue"
import dashboard from "@/views/dashboard.vue"
import quiz from "@/views/quiz.vue"
import scam from "@/views/scam.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home',
      component: emptyLayout,
      meta: { title: '/', hidden: true },
      children:[
        {
          path: '/home',
          name: 'home',
          component: home,
          meta: { title: '/home', hidden: false },
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: basicLayout,
      redirect: '/dashboard',
      meta: { title: '/dashboard', hidden: false },
      children:[
        {
          path: '/dashboard',
          name: 'dashboard',
          component: dashboard,
          meta: { title: '/dashboard', hidden: false },
        },
        {
          path: '/quiz',
          name: 'quiz',
          component: quiz,
          meta: { title: '/quiz', hidden: false },
        },
        {
          path: '/scam',
          name: 'scam',
          component: scam,
          meta: { title: '/scam', hidden: false },
        }
      ]
    }
   
  ]
})

export default router
