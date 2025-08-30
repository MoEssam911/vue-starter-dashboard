// src/locales/index.js
import { createI18n } from 'vue-i18n';
import { useDynamicCookies } from '@/composables/useDynamicCookies';

// Import common translations
import enCommon from './en';
import arCommon from './ar';

// Function to load module locales
function loadModuleLocales() {
  const modules = import.meta.glob('../modules/**/locales/*.js', { eager: true });
  const messages = { en: { ...enCommon }, ar: { ...arCommon } };
  
  for (const path in modules) {
    const moduleData = modules[path].default;
    const pathParts = path.split('/');
    const lang = pathParts[pathParts.length - 1].replace('.js', '');
    const moduleName = pathParts[2];
    
    if (!messages[lang]) messages[lang] = {};
    
    for (const key in moduleData) {
      if (!messages[lang][key]) messages[lang][key] = {};
      messages[lang][key] = { ...messages[lang][key], ...moduleData[key] };
    }
  }
  
  return messages;
}

// Get saved language from cookies or default to 'ar' (Arabic)
const { getCookie } = useDynamicCookies();
const savedLocale = getCookie('locale') || 'ar';

// Set initial HTML attributes based on saved language
document.documentElement.dir = savedLocale === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = savedLocale;

// Create i18n instance
const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: loadModuleLocales(),
  legacy: false
});

export default i18n;