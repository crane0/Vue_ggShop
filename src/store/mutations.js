import Vue from 'vue'

import {RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from './mutation_types'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  //退出登录，将用户信息置位空
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },

  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [INCREMENT_FOOD_COUNT](state, {food}) {
    /*
    * 已经数据绑定的对象中，新添加了属性，
    *   则需要使用Vue.set()进行添加，否则是不会进行数据绑定的，页面也就不会显示新添加的属性
    *
    * 因为count属性一开始是没有的（undefined），所以不能直接+1
    * */
    if (!food.count) {
      // food.count = 1
      Vue.set(food, 'count', 1)
    } else {
      food.count++
    }
  },

  [DECREMENT_FOOD_COUNT](state, {food}) {
    /*
    * 因为删除的按钮，是有动画效果的，
    *   可能会存在删除按钮没有消失时，连续的点击
    * 做判断，就是为了避免。>0才能减
    * */
    if (food.count) {
      food.count--
    }
  }
}
