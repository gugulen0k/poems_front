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
        component: () => import('./log_in'),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('./register'),
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
        component: () => import('./poems'),
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
        component: () => import('./authors'),
      },
      {
        path: '/authors/:authorId(\\d+)',
        name: 'Author',
        component: () => import('./author_show'),
      },
      {
        path: '/favorite_poems',
        name: 'FavoritePoems',
        component: () => import('./favorite_poems'),
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
