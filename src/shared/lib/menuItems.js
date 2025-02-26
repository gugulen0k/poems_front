import { ref } from 'vue'
import {
  faFeather,
  faHeart,
  faShuffle,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import {
  MENU_ITEM_AUTHORS,
  MENU_ITEM_FAVORITE,
  MENU_ITEM_POEMS,
} from './constants'

export const menuItems = ref([
  {
    label: 'All Poems',
    itemName: MENU_ITEM_POEMS,
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
    itemName: MENU_ITEM_AUTHORS,
    route: '/authors',
    icon: faUsers,
  },
])

export const authenticatedMenuItems = ref([
  {
    label: 'Favorite Poems',
    itemName: MENU_ITEM_FAVORITE,
    route: '/favorite',
    icon: faHeart,
  },
])
