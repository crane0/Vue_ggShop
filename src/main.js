/*
* 入口js
* */

import Vue from 'vue'
import {Button} from 'mint-ui'

import App from './App'
import router from './router'
import store from './store'

/*
* 注意，不是use，是注册组件标签
* 定义在main中，是因为想要在全局使用，此时，只用做退出登录功能
*   这样就有了一个<mt-button>标签
* */
Vue.component(Button.name, Button)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
