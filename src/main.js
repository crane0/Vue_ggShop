/*
* 入口js
* */

import Vue from 'vue'
//图片懒加载
import VueLazyload from 'vue-lazyload'
import {Button} from 'mint-ui'

import App from './App'
import router from './router'
import store from './store'

import loading from './common/images/loading.gif'
import './mock/mockServer' // 加载mockServer即可

/*
* 注意，不是use，是注册组件标签
* 定义在main中，是因为想要在全局使用，此时，只用做退出登录功能
*   这样就有了一个<mt-button>标签
* */
Vue.component(Button.name, Button)

/*
* 内部会定义一个指令 v-lazy
*   该项目中，只在ShowFood中，使用了一下
* */
Vue.use(VueLazyload, {
  loading
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
