import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'

import './index.scss'
import { NoirAura, pinia, router } from './providers'
import App from './App.vue'

const app = createApp(App)
  .use(VueQueryPlugin)
  .use(router)
  .use(pinia)
  .use(PrimeVue, {
    theme: {
      preset: NoirAura,
      options: {
        darkModeSelector: '.dark-theme-enabled',
        cssLayer: {
          name: 'primevue',
          order: 'tailwind-base, primevue, tailwind-utilities',
        },
      },
    },
  })

app.mount('#app')
