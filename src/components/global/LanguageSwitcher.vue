<!-- src/components/common/LanguageSwitcher.vue -->
<template>
  <div class="language-switcher">
    <button 
      @click="setLocale('ar')" 
      :class="{ active: currentLocale === 'ar' }"
      :aria-label="$t('common.language_ar')"
    >
      العربية
    </button>
    <button 
      @click="setLocale('en')" 
      :class="{ active: currentLocale === 'en' }"
      :aria-label="$t('common.language_en')"
    >
      English
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useDynamicCookies } from '@/composables/useDynamicCookies';

const { locale } = useI18n();
const { setCookie } = useDynamicCookies();

const currentLocale = locale;

const setLocale = (newLocale) => {
  locale.value = newLocale;
  console.log("newLocale",newLocale)
  setCookie('locale', newLocale);
  
  // Update HTML attributes for RTL/LTR support and language
  document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = newLocale;
};
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 5px;
}

button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  border-radius: 3px;
  font-weight: bold;
  min-width: 40px;
}

button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

/* Arabic button specific styles */
button:first-child {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
}
</style>