// src/modules/dashboard/routes/dashboard.routes.js
export default [
  {
    path: '',
    name: 'Home',
    component: () => import('@/modules/dashboard/pages/Home.vue'),
    meta: { title: 'Home', requiresAuth: true },
  },
  // {
  //   path: 'profile',
  //   name: 'Profile',
  //   component: () => import('@/modules/dashboard/views/ProfileView.vue'),
  //   meta: { title: 'Profile', requiresAuth: true }
  // },
  // {
  //   path: 'settings',
  //   name: 'Settings',
  //   component: () => import('@/modules/dashboard/views/SettingsView.vue'),
  //   meta: { title: 'Settings', requiresAuth: true }
  // }
]
