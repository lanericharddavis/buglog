import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/bugs',
    name: 'BugLogPage',
    component: loadPage('BugLogPage')
  },
  {
    path: '/examplebugreport',
    name: 'ExampleBugReportPage',
    component: loadPage('ExampleBugReportPage')
  },
  {
    path: '/bugs/:id',
    name: 'BugReportPage',
    component: loadPage('BugReportPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

export default router
