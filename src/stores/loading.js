import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const appLoading = ref(true)

  const setAppLoading = (value) => {
    appLoading.value = value
  }

  return {
    appLoading,
    setAppLoading,
  }
})
