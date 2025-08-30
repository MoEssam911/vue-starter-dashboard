// src/plugins/primevue.js
import PrimeVue from 'primevue/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// Create a more comprehensive theme preset
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e6f1ff',
      100: '#cce3ff',
      200: '#99c7ff',
      300: '#66abff',
      400: '#338fff',
      500: '#0f62fe',
      600: '#0c4ecb',
      700: '#093b98',
      800: '#062765',
      900: '#031432',
      950: '#020a19'
    },
    success: {
      50: '#e6f9f2',
      100: '#ccf3e5',
      500: '#02cd7c',
      900: '#014f30'
    },
    colorScheme: {
      light: {
        primary: {
          color: '#0f62fe'
        },
        surface: {
          0: '#ffffff',
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        }
      }
    }
  },
  components: {
    button: {
      root: {
        borderRadius: '6px',
        fontWeight: '500'
      }
    },
    inputtext: {
      root: {
        borderRadius: '6px'
      }
    },
    card: {
      root: {
        borderRadius: '12px',
        shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }
    }
  }
});

export const registerPlugins = (app) => {
  app.use(PrimeVue, {
    theme: {
      preset: MyPreset,
      options: {
        prefix: 'p',
        darkModeSelector: 'light',
        cssLayer: false,
      },
    },
    ripple: true, // Enable ripple effect
  });
};