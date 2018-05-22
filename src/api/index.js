/*
* 包含n个请求函数的模块
*   根据API接口文档，进行设计的
* */

import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)

//2、获取食品分类列表
export const reqCategorys = () => ajax(BASE_URL + '/index_category')

//3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(BASE_URL + '/shops', {longitude, latitude})

// 4、根据经纬度和关键字搜索商铺列表
export const reqShopLists = (geohash, keyword) => ajax(BASE_URL + '/search_shops', {geohash, keyword})

// 5、获取一次性验证码，在img的src中已经发送了请求，就不在这里操作了

// 6、用户名密码登陆  POST
export const reqLoginPwd = ({name, pwd, captcha}) => ajax(BASE_URL + '/login_pwd', {name, pwd, captcha}, 'POST')

// 7、发送短信验证码
export const reqSendcode = (phone) => ajax(BASE_URL + '/sendcode', {phone})

// 8、手机号验证码登陆 POST
export const reqLoginSms = (phone, code) => ajax(BASE_URL + '/login_sms', {phone, code}, 'POST')

// 9、根据会话获取用户信息
export const reqUserinfo = () => ajax(BASE_URL + '/userinfo')

// 10、用户登出
export const reqLogout = () => ajax(BASE_URL + '/logout')


//获取商家商品数组
export const reqShopGoods = () => ajax('/goods')

//获取商家评价数组
export const reqShopRatings = () => ajax('/ratings')

//获取商家信息
export const reqShopInfo = () => ajax('/info')





