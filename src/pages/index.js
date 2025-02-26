import AuthenticationLayout from '@/shared/ui/layouts/AuthenticationLayout.vue'
import AppDefaultLayout from '@/shared/ui/layouts/AppDefaultLayout.vue'

export const routes = [
  {
    path: '/auth',
    component: AuthenticationLayout,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('./log_in'), // Use named view 'authentication'
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('./register'), // Use named view 'authentication'
      },
    ],
  },
  {
    path: '/',
    component: AppDefaultLayout,
    children: [
      {
        path: '/poems',
        name: 'Poems',
        component: () => import('./poems'), // Nested under AppDefaultLayout
        alias: '/',
      },
      {
        path: '/poems/:poemId(\\d+)',
        name: 'Poem',
        component: () => import('./poem_show'),
      },
      {
        path: '/authors',
        name: 'Authors',
        component: () => import('./authors'), // Nested under AppDefaultLayout
      },
      {
        path: '/authors/:authorId(\\d+)',
        name: 'Author',
        component: () => import('./author_show'), // Nested under AppDefaultLayout
      },
    ],
  },
  {
    path: '/server-down',
    name: 'ServerDown',
    component: () => import('./server_down'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./not_found'),
  },
]
