// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import '@/assets/styles/main.css'
import router from './router'
import i18n from './locales'
import { installPlugins } from '@/plugins'
import { initializeStores } from '@/utils/init-store'
import ToastService from 'primevue/toastservice'

const app = createApp(App)
const pinia = createPinia()

// Install plugins (PrimeVue, global components)
installPlugins(app)

// Use core libraries
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(ToastService)

// Initialize stores
initializeStores()

app.mount('#app')
