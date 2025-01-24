export const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { path: '/poems' },
  },
  {
    path: '/poems',
    name: 'Poems',
    component: () => import('./poems'),
  },
  {
    path: '/poems/:id',
    name: 'Poem',
    component: () => import('./poem_show'),
    beforeEnter: (to, _from, next) => {
      const { id } = to.params

      // Validate the ID (e.g., ensure it's a positive number)
      if (isNaN(id) || parseInt(id) < 0) {
        next({ path: '/not-found' }) // Redirect to Not Found
      }

      next() // Proceed to the route
    },
  },
  {
    path: '/authors',
    name: 'Authors',
    component: () => import('./authors'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./not_found'),
  },
]
