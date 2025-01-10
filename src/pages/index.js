export const routes = [
  {
    path: '/',
    redirect: { path: '/poems' },
    component: () => import('./poems'),
    name: 'Home',
  },
  {
    path: '/poems',
    component: () => import('./poems'),
    name: 'Poems',
  },
  {
    path: '/poems/:id',
    component: () => import('./poem_show'),
    name: 'Poem',
  },
  {
    path: '/authors',
    component: () => import('./authors'),
    name: 'Authors',
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('./not_found'),
  },
]
