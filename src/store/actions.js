
import {RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation_types'

import {reqAddress,
  reqCategorys,
  reqShops,
  reqUserinfo,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,} from '../api'

export default {
  async getAddress ({commit, state}) {

    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress (geohash)
    if(result.code === 0){
      commit(RECEIVE_ADDRESS, {address: result.data})
    }
  },

  async getCategorys ({commit}) {

    const result = await reqCategorys ()
    if(result.code === 0){
      commit(RECEIVE_CATEGORYS, {categorys: result.data})
    }
  },

  async getShops ({commit, state}) {

    const {longitude, latitude} = state
    const result = await reqShops (longitude, latitude)
    if(result.code === 0){
      commit(RECEIVE_SHOPS, {shops: result.data})
    }
  },

  /*
  * 用户的信息是同步获取的（不发请求）
  *   因为在登陆时，发送请求会返回对应的用户信息,
  *   放到 vuex的state中，然后在展示到个人信息页面
  * */
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

  /*
  * 这个用户信息，是通过在session中的userId进行查询获取的
  *   也就实现了实时登陆功能
  *   在App中进行了调用
  * */
  async getUserinfo ({commit}) {

    const result = await reqUserinfo ()
    if(result.code === 0){
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },

  //退出登录
  async logout ({commit}) {
    const result = await reqLogout ()
    if(result.code === 0){
      commit(RESET_USER_INFO)
    }
  },


  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}) {
    const result = await reqShopRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit}, callBack) {
    const result = await reqShopGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 数据更新了, 通知一下组件
      callBack && callBack()
    }
  },

  //添加（或删除）到购物车
  updateFoodCount({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },

  //同步清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART)
  }
}
