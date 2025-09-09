// src/plugins/global-components.js
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

export const registerGlobalComponents = (app) => {
  app.component('InputText', InputText)
  app.component('IconField', IconField)
  app.component('InputIcon', InputIcon)
}
