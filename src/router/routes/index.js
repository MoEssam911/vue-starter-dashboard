// Import route modules
import authRoutes from '@/modules/auth/routes'
import dashboardRoutes from '@/modules/dashboard/dashboard.routes'

// Layout components
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

// Create routes with layouts
const routes = [
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: dashboardRoutes,
  },
  {
    path: '/',
    component: AuthLayout,
    meta: { requiresGuest: true },
    children: authRoutes,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
    meta: { title: 'Page Not Found' },
  },
]

export default routes
