<!-- src/layouts/DefaultLayout.vue -->
<template>
  <div class="default-layout">
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/profile">Profile</router-link>
        <router-link to="/settings">Settings</router-link>
        <button @click="handleLogout">Logout</button>
      </nav>
    </header>
    <main>
      <!-- Only one router-view here -->
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/modules/auth/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await authStore.clearAuthData();
  router.push({ name: 'Login' });
};
</script>