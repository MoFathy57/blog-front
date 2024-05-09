import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Login from '@/components/login.vue'
import Home from '@/components/Home.vue'
import Post from '../components/Post.vue'
import PageNotFound from '@/components/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/post/:id',
      name: 'post',
      component: Post
    },
    { path: '/:pathMatch(.*)*', component: PageNotFound }
  ]
})

export default router
