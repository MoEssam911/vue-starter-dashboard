// src/composables/useToast.js
import { toastService } from '@/services/toastService';
import { useToast } from 'primevue/usetoast';

export const usePrimeToast = () => {
  const primeToast = useToast();
  
  // Set the PrimeVue toast instance to our service
  toastService.setInstance(primeToast);
  
  // Return the service methods for use in components
  return {
    showToast: toastService.showToast.bind(toastService),
    showSuccess: toastService.showSuccess.bind(toastService),
    showError: toastService.showError.bind(toastService),
    showWarning: toastService.showWarning.bind(toastService),
    showInfo: toastService.showInfo.bind(toastService)
  };
};