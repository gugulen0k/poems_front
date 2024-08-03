import Routing from './index.vue'

export const routes = [
  {
    path: '/',
    component: () => import('./task-list-page'),
    name: 'Home',
  },
]

export { Routing }
