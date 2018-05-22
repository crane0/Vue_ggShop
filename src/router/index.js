/*
* 路由器对象模块
* */

import Vue from 'vue'
import VueRouter from 'vue-router'

// import Msite from '../pages/Msite/Msite'
// import Order from '../pages/Order/Order'
// import Search from '../pages/Search/Search'
// import Profile from '../pages/Profile/Profile'
// import Login from '../pages/Login/Login'
/*
* 路由组件，懒加载
* 当切换到目标路由时，才加载
*   注意，这样的实现，会在打包时分为多个 js，
*     也就意味着多发请求获取js文件，所以适可而止
*
* */
const Msite = () => import('../pages/Msite/Msite')
const Order = () => import('../pages/Order/Order')
const Search = () => import('../pages/Search/Search')
const Profile = () => import('../pages/Profile/Profile')
const Login = () => import('../pages/Login/Login')

import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'

/*
* 声明使用vue-router
* 内部定义并注册了 2个组件标签（router-link/router-view）
*   给组件对象添加了 2个属性
*     1.$router 路由器
*     2.$route 当前路由
* */
Vue.use(VueRouter)

export default new VueRouter({
  //配置所有路由
  routes: [
    {
      //默认路由
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: Msite,
      /*
      * 路由元信息
      * 配合App中v-show，来处理FooterGuide的显示隐藏，需要显示的路由组件，都要有
      * */
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '',
          redirect: '/shop/goods'
        },
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
      ]
    },
  ]
})
