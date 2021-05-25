import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import roleManagement from '../components/Management/roleManagement.component.vue'
import userManagement from '../components/Management/userManagement.component.vue'
import activityManagement from '../components/Management/activityManagement.component.vue'
import contactManagement from '../components/Management/contactManagement.component.vue'
import dealsManagement from '../components/Management/dealsManagement.component.vue'
import test from '../components/Management/test.component.vue'
import Nav from '../components/navBar/navBar.component.vue';
import calendar from '../components/Management/calendar.component.vue'
import profileManagement from '../components/Management/profileManagement.component.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/Nav',
    name: 'Nav',
    component: () => import('../components/navBar/navBar.component.vue'),
  },
  {
    path: '/login/:token',
    name: 'login',
    component: () => import('../components/auth/login.component.vue'),
  },
  {
    path: '/signIn',
    name: 'signIn',
    // component: () => import('../components/auth/login.component.vue'),
  },
  {
    path: '/updatePassword',
    name: 'updatePassword',
    component: () => import('../components/auth/updatePassword.component.vue'),
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: () => import('../components/auth/forgetPassword.component.vue'),
  },
  {
    path: '/resetPassword/:token',
    name: 'resetPassword',
    component: () => import('../components/auth/resetPassword.component.vue'),
  },
  {
    path: '/register/:token',
    name: 'register',
    component: () => import('../components/auth/register.component.vue'),
  },
  {
    path: '/roleManagement',
    name: 'roleManagement',
    components: {
      default: roleManagement,
      NavBar: Nav
    },
  },
  {
    path: '/test',
    name: 'test',
    components: {
      default: test,
      NavBar: Nav
    },
  },
  {
    path: '/activityManagement',
    name: 'activityManagement',
    components: {
      default: activityManagement,
      NavBar: Nav
    },
  },
  {
    path: '/contactManagement',
    name: 'contactManagement',
    components: {
      default: contactManagement,
      NavBar: Nav
    },
  },
  {
    path: '/dealsManagement',
    name: 'dealsManagement',
    components: {
      default: dealsManagement,
      NavBar: Nav
    },
  },
  {
    path: '/userManagement',
    name: 'userManagement',
    components: {
      default: userManagement,
      NavBar: Nav
    },
  },
  {
    path: '/profileManagement',
    name: 'profileManagement',
    components: {
      default: profileManagement,
      NavBar: Nav
    },
  },
  {
    path: '/calendar',
    name: 'calendar',
    components: {
      default: calendar,
      NavBar: Nav
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router