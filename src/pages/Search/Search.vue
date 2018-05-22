<template>
  <section class="search">
    <HeaderTop title="搜索"/>
    <form class="search_form" @submit.prevent="search">
      <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input">
      <input type="submit" name="submit" class="search_submit">
    </form>

    <section class="list">
      <ul class="list_container">
        <li class="list_li">
          <section class="item_left">
            <img src="http://cangdu.org:8001/img/16265a70fe27854.jpg" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>aaa</span>
              </p>
              <p>月售 671 单</p>
              <p>20 元起送 / 距离1058.2公里</p>
            </div>
          </section>
        </li>
      </ul>
    </section>

  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

  export default {
    name: "search",
    methods: {
      search () {
        this.$store.dispatch('searchShop')
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
