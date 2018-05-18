/*
* 路由器对象模块
* */

import Vue from 'vue'
import VueRouter from 'vue-router'

import Msite from '../pages/Msite/Msite'
import Order from '../pages/Order/Order'
import Search from '../pages/Search/Search'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'

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
  ]
})
