import {
  faFeather,
  faShuffle,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

export const menuItems = ref([
  {
    label: 'All Poems',
    route: '/poems',
    icon: faFeather,
  },
  {
    label: 'Random Poem',
    route: '/poems/:id',
    icon: faShuffle,
  },
  {
    label: 'All Authors',
    route: '/authors',
    icon: faUsers,
  },
  {
    label: 'Random Author',
    route: '/authors/:id',
    icon: faShuffle,
  },
])
