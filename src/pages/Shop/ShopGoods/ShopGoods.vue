<!--
  点餐页面
-->
<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current: index === currentIndex}" @click="clickMenuItem(index)">
          <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon">
            {{good.name}}
          </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper">
        <!--这里设置ref，是为了更快的找到ul，就可以找到所有的li，当然用 id也是可以的-->
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <!--
                      添加到购物车
                      因为食品添加的数量，每个食物都应该 有各自的数量count
                        所以，给每个food都添加了一个新的属性。
                        所以，要将food传递过去
                  -->
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!--展示food的详情-->
    <ShowFood :food="food" ref="food"/>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'

  import CartControl from '../../../components/CartControl/CartControl'
  import ShowFood from '../../../components/ShowFood/ShowFood'

  export default {
    name: "Shop-goods",
    data () {
      return {
        scrollY: 0,   //右侧滑动的Y轴坐标（实时变化）
        tops: [],   //右侧分类的 li的距离顶端的top组成的数组（列表第一次显示后，就固定不变了）
        food: {}    //需要显示的food
      }
    },
    computed: {
      ...mapState(['goods']),

      // 计算得到当前分类的下标，选中状态的样式不同
      currentIndex () {
        const {scrollY, tops} = this
        const index = tops.findIndex((top, index) => {
          return scrollY >= top && scrollY < tops[index+1]
        })
        return index
      }
    },
    mounted () {
      this.$store.dispatch('getShopGoods', () => {
        //列表数据更新之后，在执行
        this.$nextTick(() => {
          this._initScroll()
          this._initTops()
        })
      })
    },

    methods: {
      //初始化滚动
      _initScroll () {
        new BScroll('.menu-wrapper', {
          click: true   //默认是禁止点击的
        })
        this.foodsScroll = new BScroll('.foods-wrapper', {
          probeType: 2,  // 因为惯性滑动不会触发
          click: true   //默认是禁止点击的
        })
        //右侧列表绑定scroll监听，滑动过程中，会实时触发
        this.foodsScroll.on('scroll', ({x, y}) => {
          //因为上滑，y是负值
          this.scrollY = Math.abs(y)
        })
        //右侧列表绑定scroll结束监听，当滑动结束停止后，就会得到对应的 x,y
        this.foodsScroll.on('scrollEnd', ({x, y}) => {
          //因为上滑，y是负值
          this.scrollY = Math.abs(y)
        })
      },
      //初始化tops
      _initTops () {
        //初始化tops，将每个 li对应的top值，存入数组中
        const tops = []
        let top = 0
        tops.push(top)
        //找到所有的li,然后收集对应的top
        const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
        Array.from(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        this.tops = tops
        console.log(tops)
      },

      //点击左侧列表，右侧列表同步位置
      clickMenuItem (index) {
        const scrollY = this.tops[index]
        this.scrollY = scrollY

        this.foodsScroll.scrollTo(0,-scrollY,300)
      },

      //点击，显示对应的food
      showFood (food) {
        //点击获取的food信息，添加到组件对象上
        this.food = food
        /*
        * 这是从父级调用子级的方法（）
        *   this.$refs.food获取的是组件标签，也就是组件对象
        * */
        this.$refs.food.toggleShow()
      }
    },

    components: {
      CartControl,
      ShowFood
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green   //变量在混合中定义了
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>


