<!-- src/layouts/DefaultLayout.vue -->
<template>
  <div class="default-layout">
    <Navbar />
    <aside>
      <SideBar />
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/modules/auth/stores/authStore'
import { useRouter } from 'vue-router'
import SideBar from './components/SideBar.vue'
import Navbar from './components/Navbar.vue'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.clearAuthData()
  router.push({ name: 'Login' })
}
</script>
