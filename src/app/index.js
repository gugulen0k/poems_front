import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { MotionPlugin } from '@vueuse/motion'
import PrimeVue from 'primevue/config'

import './index.css'
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
          order: 'base, primevue',
        },
      },
    },
  })

app.mount('#app')
