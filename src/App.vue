<template>
  <div>
    <!--路由组件-->
    <keep-alive>
      <router-view/>
    </keep-alive>
    <!--底部-->
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {mapActions} from 'vuex'

  export default {
    name: "app",

    mounted () {
      this.getAddress()
      this.getUserinfo()
    },

    methods: {
      ...mapActions(['getAddress', 'getUserinfo'])
      // mapActions (names) {
      //   const result = {}
      //   names.forEach(name => {
      //     result[name] = function () {
      //       return this.$store.dispatch(name)
      //     }
      //   })
      //   return result
      // }
      //最后再将返回的对象解构
    },
    components: {
      FooterGuide
    },
  }
</script>

<!--为了可以使用stylus语法-->
<style lang="stylus" rel="stylesheet/stylus">

</style>
