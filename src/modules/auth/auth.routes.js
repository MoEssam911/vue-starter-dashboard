// src/modules/auth/routes/auth.routes.js
export default [
  {
    path: 'login',
    name: 'Login',
    component: () => import('@/modules/auth/pages/Login.vue'),
    meta: { title: 'Login' },
  },
  {
    path: 'register',
    name: 'Register',
    component: () => import('@/modules/auth/pages/Register.vue'),
    meta: { title: 'Register' },
  },
  {
    path: 'forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/modules/auth/pages/ForgotPassword.vue'),
    meta: { title: 'Forgot Password' },
  },
  {
    path: 'reset-password/:token',
    name: 'ResetPassword',
    component: () => import('@/modules/auth/pages/ResetPassword.vue'),
    meta: { title: 'Reset Password' },
  },
]
