
import {RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO
} from './mutation_types'

import {reqAddress, reqCategorys, reqShops, reqUserinfo} from '../api'

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
}
