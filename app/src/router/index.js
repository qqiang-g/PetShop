import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
    import Mall from '../views/Mall.vue'
    import Sort from '../views/Sort.vue'
    import Cart from '../views/Cart.vue'
    import My from '../views/My.vue'
import Search from '../views/Search.vue'
import Myinfo from '../views/Myinfo.vue'
import Adress from '../views/Adress.vue'
import ExitAdtess from '../views/ExitAdress'
import List from '../views/List'
import Message from '../views/Message'
import Product from '../views/Product'
import Login from '../views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/',
        name: 'Mall',
        component:Mall,
      },
      {
        path: '/sort',
        name: 'Sort',
        component:Sort
      },
      {
        path: '/cart',
        name: 'Cart',
        component:Cart
      },
      {
        path: '/my',
        name: 'My',
        component:My
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component:Search
  },
  {
    path: '/myinfo',
    name: 'Myinfo',
    component:Myinfo
  },
  {
    path: '/adress',
    name: 'Adress',
    component:Adress
  },
  {
    path: '/exitadress',
    name: 'ExitAdtess',
    component:ExitAdtess
  },
  {
    path: '/list',
    name: 'List',
    component:List
  },
  {
    path: '/message',
    name: 'Message',
    component:Message
  },
  {
    path: '/product',
    name: 'Product',
    component:Product
  },
  {
    path: '/login',
    name: 'Login',
    component:Login
  }
]

const router = new VueRouter({
  routes
})

export default router
