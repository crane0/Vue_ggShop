/*
包含多个基于state的getter计算属性的对象
 */

export default {
  //购物车中总数量
  totalCount (state) {
    return state.shopCartFoods.reduce((preTotal, food) => preTotal + food.count , 0)
  },
  //购物车中总价
  totalPrice (state) {
    return state.shopCartFoods.reduce((preTotal, food) => preTotal + food.count*food.price , 0)
  },
}
