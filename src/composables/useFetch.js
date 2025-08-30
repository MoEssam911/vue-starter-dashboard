// src/composables/useFetch.js
import { ref, watch } from 'vue'
import axiosInstance from '@/api/axios'
import { toastService } from '@/services/toastService' // Use the toast service directly

export const useFetch = (url, options = {}) => {
  const {
    method = 'GET',
    body,
    params,
    transform,
    immediate = true,
    watch: watchValues = [],
    showToast = true
  } = options

  const data = ref(null)
  const response = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const statusCode = ref(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    statusCode.value = null

    try {
      const res = await axiosInstance.request({
        url,
        method,
        data: body,
        params,
      })

      response.value = res
      statusCode.value = res?.status ?? null
      data.value = transform ? transform(res) : res.data
      
      // Show success toast for non-GET requests if enabled
      if (showToast && method !== 'GET') {
        toastService.showSuccess('Operation completed successfully')
      }
      
      return {
        data: data.value,
        response: response.value,
        loading: loading.value,
        error: error.value,
        statusCode: statusCode.value,
      }
    } catch (err) {
      error.value = err
      statusCode.value = err.response?.status ?? null
      
      // Error toast is handled by the interceptor
      throw err
    } finally {
      loading.value = false
    }
  }

  if (watchValues.length > 0) {
    watch(watchValues, fetchData, { immediate })
  } else if (immediate) {
    fetchData()
  }

  return {
    data,
    response,
    loading,
    error,
    statusCode,
    refresh: fetchData,
    execute: fetchData,
  }
}