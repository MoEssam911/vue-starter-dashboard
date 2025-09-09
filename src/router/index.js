// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
// import { setupGuards } from '@/middleware/guard'
import routes from './routes'
// import { useAuthStore } from '@/modules/auth/stores/authStore'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Route guard for authentication
// router.beforeEach((to, from, next) => {
//   setupGuards(to, from, next)
// })

export default router
