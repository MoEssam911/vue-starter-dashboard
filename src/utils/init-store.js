import { useAuthStore } from '@/modules/auth/stores/authStore'

// src/utils/init-store.js
export const initializeStores = () => {
  // Initialize all stores that need initialization
  const authStore = useAuthStore()
  authStore.initialize()

  // Add more stores here if needed
}
