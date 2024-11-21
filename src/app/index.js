import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { MotionPlugin } from '@vueuse/motion'
import PrimeVue from 'primevue/config'

import './index.scss'
import { MyPreset, pinia, router } from './providers'
import App from './App.vue'

const app = createApp(App)
  .use(VueQueryPlugin)
  .use(router)
  .use(pinia)
  .use(MotionPlugin)
  .use(PrimeVue, {
    theme: {
      preset: MyPreset,
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
