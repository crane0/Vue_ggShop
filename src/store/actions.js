
import {RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation_types'

import {reqAddress, reqCategorys, reqShops} from '../api'

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
  }
}
