<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import nav from './components/nav/nav.vue';
  import swiper from './components/swiper/swiper.vue';

  export default {
    components: {
      'v-nav': nav,
      'v-swiper': swiper
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
html
  padding 0
  margin 0
  width 100%
  height 100%
  body
    margin 0
    padding 0
    width 100%
    height 100%
    #app
      // position absolute
      width 100%
      height 100%
      // background-color #808c8c
</style>
