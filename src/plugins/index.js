// src/plugins/index.js
import { registerPlugins } from '@/plugins/primevue';
import { registerGlobalComponents } from '@/plugins/global-components';

export const installPlugins = (app) => {
  registerPlugins(app);
  registerGlobalComponents(app);
};