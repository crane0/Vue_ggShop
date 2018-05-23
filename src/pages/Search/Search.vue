<template>
  <section class="search">
    <HeaderTop title="搜索"/>
    <form class="search_form" @submit.prevent="search">
      <input type="search" placeholder="请输入商家或美食名称" class="search_input" v-model="keyword">
      <input type="submit" class="search_submit">
    </form>

    <section class="list" v-if="!noSearchShops">
      <ul class="list_container">
        <!--
          to指定的路由路径，可以使用params参数，也可以使用query参数，
            :to="'/shop?id='+item.id"
          tag，指定<router-link> 渲染的标签，默认是 a标签
            无论何种标签，都具有点击监听
        -->
        <!--:to="'/shop?id='+item.id"-->
        <router-link :to="{path:'/shop', query: {id: item.id}}" tag="li"
                     v-for="item in searchShops" :key="item.id" class="list_li">
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{item.name}}</span>
              </p>
              <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
              <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>

    <div class="search_none" v-else>很抱歉！无搜索结果</div>

  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

  export default {
    name: "search",
    data () {
      return {
        keyword: '',
        noSearchShops: false,   //判断有无数据显示
        imgBaseUrl: 'http://cangdu.org:8001/img/',
      }
    },
    computed: {
      ...mapState(['searchShops'])
    },
    methods: {
      search () {
        if (this.keyword.trim()) {
          this.$store.dispatch('searchShops', this.keyword)
        }

      }
    },
    watch: {
      //因为在搜索过程中，在发请求，当没有数据时，会显示其他提示内容
      searchShops (value) {
        if (!value.length) {  //没有数据
          this.noSearchShops = true
        } else {
          this.noSearchShops = false
        }
      }
    },

    components: {
      HeaderTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .search  //搜索
    width 100%
    overflow hidden   //为了在另一页滑到其他位置时，切换到当前页面，是处于最顶端的
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          font-size 16px
          color #fff
          background-image linear-gradient(90deg,#0af,#0085ff)
    .list
      .list_container
        background-color: #fff;
        .list_li
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem

</style>
