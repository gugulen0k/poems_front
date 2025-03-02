import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { MotionPlugin } from '@vueuse/motion'
import PrimeVue from 'primevue/config'

import './index.scss'
import { MyPreset, pinia, router } from './providers'
import App from './App.vue'

const queryPluginConfig = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: false, // Disable retries globally
      },
    },
  },
}

const app = createApp(App)
  .use(VueQueryPlugin, queryPluginConfig)
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
