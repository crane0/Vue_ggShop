<template>
  <div class="cartcontrol">
    <!--
      阻止冒泡，是因为改变数量时，不能将点击事件冒泡到父级
      否则，就会触发父级的点击事件，点开大图了。
      还有，删除按钮，一开始是不显示的。
    -->
    <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-if="food.count"
             @click.stop="updateFoodCount(false)"></div>
    </transition>
      <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>

  export default {
    name: "cart-control",
    props: {
      food: Object
    },

    methods: {
      //要将food也传递过去，因为要确定给那个food更改
      updateFoodCount (isAdd) {
        this.$store.dispatch('updateFoodCount', {isAdd, food: this.food})
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)

    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>

