// src/modules/auth/routes/auth.routes.js
export default [
  {
    path: 'auth/login',
    name: 'Login',
    component: () => import('@/modules/auth/pages/Login.vue'),
    meta: { title: 'Login' },
  },
  {
    path: 'auth/register',
    name: 'Register',
    component: () => import('@/modules/auth/pages/Register.vue'),
    meta: { title: 'Register' },
  },
  {
    path: 'auth/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/modules/auth/pages/ForgotPassword.vue'),
    meta: { title: 'Forgot Password' },
  },
  {
    path: 'auth/reset-password/:token',
    name: 'ResetPassword',
    component: () => import('@/modules/auth/pages/ResetPassword.vue'),
    meta: { title: 'Reset Password' },
  },
]
