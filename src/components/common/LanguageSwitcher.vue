<!-- src/components/common/LanguageSwitcher.vue -->
<template>
  <div class="language-switcher">
    <Select
      v-model="selectedLocale"
      :options="languageOptions"
      optionLabel="name"
      optionValue="code"
      :placeholder="$t('common.select_language')"
      @change="setLocale"
      class="w-full md:w-10rem"
      :class="{ 'rtl-dropdown': selectedLocale === 'ar' }"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex align-items-center">
          <img
            :alt="getLanguageName(slotProps.value)"
            :src="getLanguageFlag(slotProps.value)"
            class="mr-2 w-6 h-6"
          />
          <div>{{ getLanguageName(slotProps.value) }}</div>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="flex align-items-center">
          <img :alt="slotProps.option.name" :src="slotProps.option.flag" class="mr-2 w-6 h-6" />
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Select>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDynamicCookies } from '@/composables/useDynamicCookies'
import Select from 'primevue/select'
import sa from '@/assets/images/svg/common/sa.svg'
import us from '@/assets/images/svg/common/us.svg'

const { locale } = useI18n()
const { setCookie, getCookie } = useDynamicCookies()

const selectedLocale = ref(locale.value)

// Language options with flags
const languageOptions = ref([
  { name: 'العربية', code: 'ar', flag: sa },
  { name: 'English', code: 'en', flag: us },
])

// Get language name by code
const getLanguageName = (code) => {
  const option = languageOptions.value.find((opt) => opt.code === code)
  return option ? option.name : ''
}

// Get language flag by code
const getLanguageFlag = (code) => {
  const option = languageOptions.value.find((opt) => opt.code === code)
  return option ? option.flag : ''
}

// Set locale and update HTML attributes
const setLocale = () => {
  const newLocale = selectedLocale.value
  locale.value = newLocale
  setCookie('locale', newLocale)

  // Update HTML attributes for RTL/LTR support and language
  document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = newLocale
}

// Watch for locale changes from other components
watch(locale, (newVal) => {
  if (selectedLocale.value !== newVal) {
    selectedLocale.value = newVal
  }
})

// Initialize from cookie on component mount
onMounted(() => {
  const savedLocale = getCookie('locale')
  if (savedLocale && savedLocale !== selectedLocale.value) {
    selectedLocale.value = savedLocale
    setLocale()
  }
})
</script>
