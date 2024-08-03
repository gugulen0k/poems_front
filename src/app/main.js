import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import { NoirAura } from './providers'

const app = createApp(App).use(PrimeVue, {
  theme: {
    preset: NoirAura,
  },
})

app.mount('#app')
