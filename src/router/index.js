import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home'
import Product from 'pages/product'
import Cart from 'pages/cart'
import Category from 'pages/category'
import Personal from 'pages/personal'
import Search from 'pages/search'

Vue.use(Router);
const routes=[
  {
    path: '/home',
    name: 'home',
    component: Home,
    children:[
      {
        path: '/product/:id',
        name: 'home-product',
        component: Product,
      },
    ]
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/personal',
    name: 'personal',
    component: Personal
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
]

export default new Router({
  routes : routes
})
