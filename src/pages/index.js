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
        component: () => import('./authors'), // Nested under AppDefaultLayout
      },
      //{
      //  path: '/authors/:id',
      //  name: 'Author',
      //  component: () => import('./author_show'), // Nested under AppDefaultLayout
      //},
      {
        path: '', // Empty path for the root of this layout
        redirect: { name: 'Poems' }, // Redirect root to /poems
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./not_found'),
  },
]
