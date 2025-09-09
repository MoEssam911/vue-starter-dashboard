<template>
  <div>
    Home
    <!-- <Button @click="showSuccess">Show Success</Button>
    <Button @click="showError">Show Error</Button>
    <Button @click="showCustom">Show Custom Message</Button> -->
    <!-- <LanguageSwitcher /> -->
  </div>
</template>

<script setup>
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import { usePrimeToast } from '@/composables/usePrimeToast'
import Button from 'primevue/button'

const { showSuccess, showError, showInfo } = usePrimeToast()

const showCustom = () => {
  showInfo('This is a custom message')
}
</script>