<!-- src/App.vue -->
<template>
  <div>
    <Toast :position="locale === 'ar' ? 'top-left': 'top-right'" />
    <router-view />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouteTitle } from '@/composables/useRouteTitle'
import Toast from 'primevue/toast'
import { usePrimeToast } from '@/composables/usePrimeToast' // This will initialize the toast service

const { locale } = useI18n()

// Initialize the toast service by using the composable
usePrimeToast()

// Set up route title updates
useRouteTitle()

// Watch for locale changes and update HTML attributes
watch(locale, (newLocale) => {
  document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = newLocale
})
</script>

<style>
/* Your existing styles */
</style>
