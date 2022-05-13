<template>
  <div class="songSquare">
    <div class="header">
      <img @click="goback" src="@/assets/arrow.png" alt />
      <div class="square">歌单广场</div>
    </div>
      <!-- nav头部 -->
    <v-nav></v-nav>
      <!-- swiper页面 -->
    <v-swiper></v-swiper>
  </div>
</template>

<script>
import nav from '@/components/songSquare/nav/nav.vue';
import swiper from '@/components/songSquare/swiper/swiper.vue';
export default {
  //返回
  methods: {
    goback() {
      this.$router.push({ path: "/" });
      }
    },
  components: {
    'v-nav': nav,
    'v-swiper': swiper
  },
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/function'
.songSquare
  padding px2rem(20px) px2rem(30px) 0 px2rem(40px)
  background-color #808c8c
  .header
    display flex
    align-items center
    .square
      font-size px2rem(46px)
      margin-left px2rem(20px)
      color #fff
</style>
