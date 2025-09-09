// modules/auth/stores/authStore.js
import { defineStore } from 'pinia'
import { useDynamicCookies } from '@/composables/useDynamicCookies'
import { useFetch } from '@/composables/useFetch'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isLoading: false,
  }),

  actions: {
    initialize() {
      const { getCookie } = useDynamicCookies()

      // Get token from cookie if exists
      const token = getCookie('auth_token')
      if (token) {
        this.token = token
      }

      // Get user data from cookie if exists
      const user = getCookie('auth_user')
      if (user) {
        this.user = user
      }
    },

    async login(credentials) {
      this.isLoading = true

      try {
        const { data, error } = await useFetch('/login', {
          method: 'POST',
          body: credentials,
          immediate: true,
          showToast: true,
        })

        if (error.value) {
          throw error.value
        }

        if (data.value && data.value.token) {
          this.setAuthData(data.value.token, data.value.user)
          return true
        }

        return false
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    setAuthData(token, user) {
      const { setCookie } = useDynamicCookies()

      this.token = token
      this.user = user

      // Set cookies
      setCookie('auth_token', token)
      setCookie('auth_user', user)
    },

    clearAuthData() {
      const { removeCookie } = useDynamicCookies()

      this.token = null
      this.user = null

      // Remove cookies
      removeCookie('auth_token')
      removeCookie('auth_user')
    },

    async logout() {
      this.isLoading = true

      try {
        // Call logout endpoint if needed (optional)
        // const { error } = await useFetch('/logout', {
        //   method: 'POST',
        //   immediate: true,
        //   showToast: false,
        // })

        // Clear auth data regardless of API call result
        this.clearAuthData()

        // Redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login'
        }

        return true
      } catch (error) {
        console.error('Logout failed:', error)
        // Still clear local data even if API call fails
        this.clearAuthData()
        throw error
      } finally {
        this.isLoading = false
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isAdmin: (state) => state.user?.role === 'admin', // Add this getter
  },
})
