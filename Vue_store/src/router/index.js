import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PromotionView from '@/views/PromotionView.vue'
import PromotionsView from '@/views/PromotionsView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
const NotFoundView = () => import('@/views/NotFoundView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/promotions', name: 'promotions', component: PromotionsView },
    {
      path: '/promotion/:id',
      name: 'promotion',
      component: PromotionView,
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView,
    },
    { path: '/product/:id', name: 'product', component: () => import('@/views/ProductView.vue') },
    { path: '/products', name: 'ProductsView', component: () => import('@/views/ProductsView.vue') },
    { path: '/:pathMatch(.*)*', name: 'NotFoundView', component: NotFoundView },
  ]
})

export default router
