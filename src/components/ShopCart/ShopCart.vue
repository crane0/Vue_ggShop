<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleShow">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount}">
              <i class="iconfont icon-shopping_cart highlight"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalPrice}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <!--enough,not-enough对应不同的样式，通过 payClass进行判断-->
          <div class="pay" :class="payClass">
            <!--payText用于显示，还差多少钱起送-->
            {{payText}}
          </div>
        </div>
      </div>

      <!--购物车列表头部显示-->
      <transition name="swipe">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <!--这是购物车列表内容-->
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in shopCartFoods">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <div class="cartcontrol">
                    <!--添加按钮-->
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {MessageBox} from 'mint-ui'
  import {mapState, mapGetters} from 'vuex'
  import CartControl from '../../components/CartControl/CartControl'

  export default {
    name: "shop-cart",
    data () {
      return {
        isShow: false
      }
    },

    computed: {
      /*
      * 购物车中的食物信息，来自商家的信息
      *   还有购物列表的显示
      * */
      ...mapState(['info', 'shopCartFoods']),
      ...mapGetters(['totalCount', 'totalPrice']),

      payClass () {
        const {totalPrice} = this
        //起送价格
        const {minPrice} = this.info
        /*
        * 注意，因为minPrice是异步获取的，所以没有获取到时，是undefined
        *   payClass一开始执行一次时，和undefined比较时，肯定是false，
        *   所以，要将默认的样式作为false对应的，
        *   否则，就会先闪一下其他样式。
        * */
        return totalPrice>minPrice ? 'enough': 'not-enough'
      },

      payText () {
        const {totalPrice} = this
        //起送价格
        const {minPrice} = this.info

        if (totalPrice === 0) {
          return `还差${minPrice}元起送`
        } else if (totalPrice < minPrice) {
          return `还差${minPrice-totalPrice}元起送`
        } else {
          return '去结算'
        }
      },

      //购物车列表展示
      listShow () {
        if (this.totalCount === 0) {
          this.isShow = false
          return false
        }
        //如果显示
        if (this.isShow) {
          this.$nextTick(() => {
            /*
            * 保证单例对象，是因为点击打开购物车列表时，
            *   如果多次重复打开，每次打开都会创建BScroll对象，则其实打开了多个列表，
            *     则在购物车列表中，添加数量时，就可能会多次添加
            * 所以，要使用单例，保证只有一个实例对象。
            * */
            if (!this.scroll) {
              this.scroll = new BScroll('.list-content', {
                click: true
              })
            } else {
              /*
              * 因为列表是动态，随时都会添加更新的
              * 所以，需要重新统计内容的高度，确保每个第一次（更新）可以滑动
              * */
              this.scroll.refresh()
            }
          })
        }
        return this.isShow
      }
    },

    methods: {
      toggleShow () {
        if (this.totalCount > 0) {
          this.isShow = !this.isShow
        }
      },

      clearCart () {
        MessageBox.confirm('确定清空吗？').then(action => {
          this.$store.dispatch('clearCart')
        })
      }
    },

    components: {
      CartControl
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $green
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 5px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          font-size 16px
          font-weight 700
          color #fff
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align bottom
          margin-bottom 15px
          margin-left -45px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color #fff
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background $green
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translateY(-100%)
      &.swipe-enter-active, &.swipe-leave-active
        transition transform .3s
      &.swipe-enter, &.swipe-leave-to
        transform translateY(0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background rgba(7, 17, 27, 0)
</style>


