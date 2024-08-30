import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setupPageGuard } from './permission'
import { ChatLayout } from '@/views/chat/layout'
import { useAuthStore } from '@/store/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: ChatLayout,
    redirect: '/chat',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/chat/:uuid?',
        name: 'Chat',
        component: () => import('@/views/chat/index.vue'),
      },
    ],
  },
  {
    path: '/g',
    name: 'g',
    component: ChatLayout,
    redirect: '/g/g-2fkFE8rbu',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/g/:gid',
        name: 'GPTs',
        component: () => import('@/views/chat/index.vue'),
      },
    ],
  },
  {
    path: '/m',
    name: 'm',
    component: ChatLayout,
    redirect: '/m/gpt-3.5-turbo',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/m/:gid',
        name: 'Model',
        component: () => import('@/views/chat/index.vue'),
      },
    ],
  },
  {
    path: '/s',
    name: 's',
    component: ChatLayout,
    redirect: '/s/t',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/s/t',
        name: 'Setting',
        component: () => import('@/views/chat/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/auth/Signup.vue'),
    meta: { requiresGuest: true }
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export async function setupRouter(app: App) {
  app.use(router)
  setupPageGuard(router)
  await router.isReady()
}
