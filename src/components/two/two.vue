<template>
  <div class="two">
    <!-- <div class="loading" v-show="show">
      <p>内容加载中......</p>
    </div> -->
    <div class="content" v-show="toggleShow">
      <!-- <v-swiper></v-swiper> -->
      <!-- tab -->
      <div class="tab">
        <div class="tab-container" v-for="(item,index) in tab" :key="index">
          <div class="box1" @click="goTo(index)">
            <div class="box2">
              <img :src="item.url" alt="">
            </div>
          </div>
          <div class="tab-name">
            {{item.name}}
          </div>
        </div>
      </div>
      <!-- 推荐歌单 -->
      <v-songlist></v-songlist>
      <!-- 推荐视频 -->
      <v-recVideo :Video ="mvVideo"><h3>云村精选</h3></v-recVideo>  
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
// import swiper from './swiper/swiper'
import songlist from '@/components/songlist'
import recVideo from '@/components/recVideo'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import api from "@/api/index";
  export default {
    data() {
      return {
        show: true,
        toggleShow: false,
        isLoad: false,
        tab:[
          {name:'每日推荐',url:require('@/assets/tu1.png')},
          {name:'歌单',url:require('@/assets/tu2.png')},
          {name:'排行榜',url:require('@/assets/tu3.png')},
          {name:'电台',url:require('@/assets/tu4.png')},
        ]
      }
    },
    components:{
      // 'v-swiper' : swiper,
      'v-songlist': songlist,
      'v-recVideo': recVideo
    },
    computed:{
      ...mapGetters([
        'mvVideo'
      ]),
    },
    mounted() {
      this.initFunc();
    },
    methods: {
      //初始化
      initFunc() {
        if (!this.isLoad) {
          setTimeout(() => {
            this.show = false;
            this.toggleShow = true;
            this.isLoad = true;
          }, 5)
        } else {
          this.show = false;
          this.toggleShow = true;
        }
      },
      goTo(index){
        if(index == 0){
          //跳去每日推荐
          this.$router.push({path:'/daySongs'});
          // console.log('day')
          // api.getRecommendSongs().then( (res) =>{
          //   if(res.code == 200){
          //     console.log(res);
          //   }
          // })
        }
        if(index == 1){
          //跳去歌单
          this.$router.push({path:'/songSquare/songSquare'});
        }
        if(index ==2){
          //跳去排行榜
          this.$router.push({path:'/ranking'});
        }
        if(index ==3){
          //跳去电台
        }
      },
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/css/function'
.two
  background-color #808c8c
  .content
    .tab
      display flex
      align-items center
      justify-content: space-around;
      .tab-container
        // flex 1
        text-align center
        .box1
          width px2rem(100px)
          height px2rem(100px)
          border-radius 50%
          border 1px solid #cdcdcd
          justify-content: center; /*子元素水平居中*/
          align-items: center; /*子元素垂直居中*/
          display: -webkit-flex
          background-color #cdcdcd
          .box2
            width px2rem(50px)
            height px2rem(50px)
            background-color #fff
            border-radius 50%
            border 1px solid #fff
            img
              margin auto
              width px2rem(50px)
              height px2rem(50px)
        .tab-name
          color #fff
          font-size px2rem(32px)
          margin-top 8px
              
</style>
