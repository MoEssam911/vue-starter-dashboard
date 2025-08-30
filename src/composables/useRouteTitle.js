// src/composables/useRouteTitle.js
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

export const useRouteTitle = () => {
  const route = useRoute()
  const { t } = useI18n()

  watch(
    () => route.meta.title,
    (newTitle) => {
      if (newTitle) {
        document.title = `${t(newTitle)} - ${import.meta.env.VITE_APP_NAME || 'App'}`
      } else {
        document.title = import.meta.env.VITE_APP_NAME || 'App'
      }
    },
    { immediate: true },
  )
}
