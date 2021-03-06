/*
* 状态对象
* */

export default {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], //商家数组

  userInfo: {},   //用户信息

  goods: [], // 商品列表
  shopCartFoods: [],  //购物车中的食物列表，直接在mutations.js中使用了

  ratings: [], // 商家评价列表
  info: {}, // 商家信息

  searchShops: [] // 搜索商家列表

}
