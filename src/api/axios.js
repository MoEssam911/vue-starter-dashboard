// src/api/axios.js
import axios from 'axios'
import i18n from '@/locales'
import { useAuthStore } from '@/modules/auth/stores/authStore'
import { toastService } from '@/services/toastService' // Import the toast service

const baseURL = import.meta.env.VITE_APP_BASE_URL
const accessKey = import.meta.env.VITE_APP_API_KEY

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'api-key': accessKey,
  },
})

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add language header
    config.headers['Accept-Language'] = i18n.global.locale.value

    // Add auth token if available
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }

    return config
  },
  (error) => {
    // Show error toast for request errors
    toastService.showError('Network error. Please check your connection.')
    return Promise.reject(error)
  },
)

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.config.url)

    let errorMessage = 'An unexpected error occurred'

    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.response?.statusText) {
      errorMessage = error.response.statusText
    } else if (error.message) {
      errorMessage = error.message
    }

    // Show error toast
    toastService.showError(errorMessage)

    // Handle authentication errors
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()

      // Redirect to login if not already there
      if (!window.location.pathname.includes('login')) {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance