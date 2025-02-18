import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/pages'
import {
  serverStatus,
  updateServerStatus,
} from '@/shared/model/stores/serverStatus'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

//router.beforeEach(async (to, _from, next) => {
//  if (to.name === 'ServerDown') {
//    next()
//    return
//  }
//
//  await updateServerStatus()
//
//  if (!serverStatus.value) {
//    next({ name: 'ServerDown' })
//  } else {
//    next()
//  }
//})
