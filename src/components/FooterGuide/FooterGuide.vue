<template>
  <footer class="footer_guide border-1px">
    <span class="guide_item" :class="{on: isCurrent('/msite')}" @click="goto('/msite')">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </span>
    <span class="guide_item" :class="{on: isCurrent('/search')}" @click="goto('/search')">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </span>
    <span class="guide_item" :class="{on: isCurrent('/order')}" @click="goto('/order')">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </span>
    <span class="guide_item" :class="{on: isCurrent('/profile')}" @click="goto('/profile')">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </span>
  </footer>
</template>

<script>
  export default {
    name: "footer-guide",
    methods: {
      isCurrent (path) {
        return this.$route.path === path
      },
      goto (path) {
        this.$router.replace(path)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .footer_guide
    top-border-1px(black)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1  //只写一个number，则默认是flex-grow的值，平均分配富裕空间
      text-align center
      flex-direction column   //主轴垂直，则侧轴就是水平方向了
      align-items center  //侧轴富裕空间，在上下两边
      margin 5px
      color #999999
      &.on
        color #0af
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
