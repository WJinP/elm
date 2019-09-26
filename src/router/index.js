import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home/home'
import city from '../components/city/city'
import indexpage from '../components/indexpage/indexpage'
import search from '../components/search/search'
import order from '../components/order/order'
import profile from '../components/profile/profile'
import food from '../components/food/food'
import shop from '../components/shop/shop'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:home,
    },
    {
      path:'/city/:id',
      component:city,
      meta: {
        keepAlive: false
    }
    },{
      path:'/indexpage',
      component:indexpage,
      meta: { keepAlive: true }
    },
    {
      path:'/search/:geohash',
      component:search
    },
    {
      path:'/order',
      component:order
    },
    {
      path:'/profile',
      component:profile
    },
    {
      path:'/food',
      component:food
    },
    {
      path:'/shop',
      component:shop
    },



  ]
})
