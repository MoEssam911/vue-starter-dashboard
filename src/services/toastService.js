// src/services/toastService.js
class ToastService {
  constructor() {
    this.toastInstance = null;
  }

  setInstance(instance) {
    this.toastInstance = instance;
  }

  showToast(message, severity = 'info', life = 5000) {
    if (!this.toastInstance) {
      console.warn('Toast instance not set. Message:', message);
      return;
    }

    if (message instanceof Event) {
      message = 'Operation completed';
    }

    this.toastInstance.add({
      severity,
      summary: message,
      life,
      closable: true
    });
  }

  showSuccess(message = 'Operation completed successfully', life = 5000) {
    if (message instanceof Event) {
      message = 'Operation completed successfully';
    }
    this.showToast(message, 'success', life);
  }

  showError(message = 'An error occurred', life = 5000) {
    if (message instanceof Event) {
      message = 'An error occurred';
    }
    this.showToast(message, 'error', life);
  }

  showWarning(message = 'Warning', life = 5000) {
    if (message instanceof Event) {
      message = 'Warning';
    }
    this.showToast(message, 'warn', life);
  }

  showInfo(message = 'Information', life = 5000) {
    if (message instanceof Event) {
      message = 'Information';
    }
    this.showToast(message, 'info', life);
  }
}

// Create a singleton instance
export const toastService = new ToastService();