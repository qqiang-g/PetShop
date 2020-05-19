import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Product from '../views/product/index.vue'
import ProductAdd from '../views/product/Add.vue'
import Category from '../views/product/Category.vue'
import CategoryAdd from '../views/product/CategoryAdd.vue'
import Order from '../views/order/index.vue'
import User from '../views/user/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component:Home,
    redirect: '/product',
    children: [
      {
        path: '/product',
        name: 'Product',
        component: Product
      },
      {
        path: '/product/add',
        name: 'ProductAdd',
        component: ProductAdd
      },
      {
        path: '/category',
        name: 'Category',
        component: Category
      },
      {
        path: '/category/add',
        name: 'CategoryAdd',
        component: CategoryAdd
      },
      {
        path: '/order',
        name: 'Order',
        component: Order
      },
      {
        path: '/user',
        name: 'User',
        component: User
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
