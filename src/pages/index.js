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
    path: '/authors',
    component: () => import('./authors'),
    name: 'Authors',
  },
]
