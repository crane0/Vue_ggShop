<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item on" :class="sc" v-for="(sc, index) in starClasses" :key="index"></span>
  </div>
</template>

<script>
  //类名常量
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'

  export default {
    name: "star",

    props: {
      score: Number,  //评分，float类型，例4.7
      size: Number  //用于匹配不同大小的star
    },

    computed: {
      /*
      * 总数是 5
      * 3.2 3on+0half+2off
      * 3.6 3on+1half+1off
      *
      * starClasses作为计算属性，动态的获取星星评分的分布
      * */
      starClasses () {
        const {score} = this
        const scs = []

        //取评分的向下取整，作为 on
        const scoreInteger = Math.floor(score)
        for(let i = 0; i < scoreInteger; i++){
          scs.push(CLASS_ON)
        }
        //因为js计算的不精准，所以做判断时，统一扩大10倍计算，
        // if(score - scoreInteger >= 0.5){
        //   scs.push(CLASS_HALF)
        // }
        //去除整数部分，剩下的>5，作为 half
        if(score*10 - scoreInteger*10 >= 5){
          scs.push(CLASS_HALF)
        }
        //当执行到这里，还不够 5的话，添加 off
        while (scs.length < 5) {
          scs.push(CLASS_OFF)
        }

        return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .star
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')



</style>
