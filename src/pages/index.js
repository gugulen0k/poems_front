export const routes = [
  {
    path: '/',
    component: () => import('./home'),
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
