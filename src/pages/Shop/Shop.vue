<template>
  <div>
    <ShopHeader/>
    <div class="tab">
      <div class="tab-item">
        <!--
            如果不加 replace，则在子路由之间进行各种跳转之后，
            点击商家左上角的返回按钮，会一直在子路由之间返回！
        -->
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <!--
        缓存路由组件
        如果没有缓存路由，当切换路由时，会重新发送ajax请求，
          但是！！！现在使用的是mockjs，ajax请求会被拦截，所以在控制台是看不到的！

        缓存之后，以当前案例来看，
          某个目标路由页面滑动之后，切换其他路由后，再切回来，还会在之前滑动的位置。
          添加购物车按钮，也会保持
    -->
    <!--<keep-alive>-->
      <router-view/>
    <!--</keep-alive>-->
  </div>
</template>

<script>
  import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'

  export default {
    mounted () {
      this.$store.dispatch('getShopInfo')
    },
    components: {
      ShopHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
