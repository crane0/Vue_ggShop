<template>
  <section class="msite">
      <!--头部-->
    <HeaderTop :title="address.name">
      <router-link slot="left" to="/search" class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link slot="right" :to="userInfo._id ? '/userInfo' :'/login'" class="header_login">
        <!--登陆后，显示一个图标-->
        <span class="header_login_text" v-if="!userInfo._id">登陆|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </HeaderTop>

      <!--导航-->
      <nav class="msite_nav border-1px">
        <div class="swiper-container" v-if="categorys.length">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
                <div class="food_container">
                  <img :src="baseImageUrl + category.image_url">
                </div>
                <span>{{category.title}}</span>
              </a>
            </div>
          </div>
          <!-- 添加这个class，配合js，可以实现根据swiper-slide的个数，自动添加小圆点的个数 -->
          <div class="swiper-pagination"></div>
        </div>
        <!--当图片没有加载出来时，显示下面的图片-->
        <img src="./images/msite_back.svg" alt="back" v-else>
      </nav>

      <!--附近商家-->
      <div class="msite_shop_list border-1px">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>

        <!--抽离出去-->
        <ShopList/>
      </div>
    </section>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'

  import {mapState, mapActions} from 'vuex'

  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'

  export default {
    name: "msite",
    data () {
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },

    mounted () {
      this.getCategorys()
      this.getShops()
    },

    methods: {
      ...mapActions(['getCategorys', 'getShops'])
    },

    computed: {
      ...mapState(['address', 'categorys', 'userInfo']),
      /*
     根据categorys一维数组生成一个2维数组
     小数组中的元素个数最大是8
      */
      categorysArr () {
        const {categorys} = this
        // 准备空的2维数组
        const arr = []
        // 准备一个小数组(最大长度为8)
        let minArr = []
        // 遍历categorys
        categorys.forEach(c => {
          // 如果当前小数组已经满了, 创建一个新的
          if(minArr.length===8) {
            minArr = []
          }
          // 如果minArr是空的, 将小数组保存到大数组中
          if(minArr.length===0) {
            arr.push(minArr)
          }
          // 将当前分类保存到小数组中
          minArr.push(c)
        })

        return arr
      }
    },

    watch: {
      categorys () {
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination',   //分页器
            },
            loop: true  //实现无缝
          })
        })
      }
    },

    components: {
      HeaderTop,
      ShopList
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite
    width 100%
    overflow hidden
    .msite_nav
      bottom-border-1px(black)
      margin-top 60px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666

        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(black)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
