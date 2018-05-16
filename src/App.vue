<template>
  <div>
    <!--路由组件-->
    <router-view></router-view>
    <!--底部-->
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'

  export default {
    name: "app",
    components: {
      FooterGuide
    }
  }
</script>

<!--为了可以使用stylus语法-->
<style lang="stylus" rel="stylesheet/stylus">

</style>
