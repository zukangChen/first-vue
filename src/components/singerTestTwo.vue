<template>
  <div class="singer">
    <div class="wrapper">
      <div class="singer-wrapper" ref="singerWrapper">
        <ul ref="itemList">
          <li class="singer-item" ref="singerList">
            <div class="title">热门歌手</div>
            <ul>
              <li class="singer-box" v-for="(singer,index) in menus" :key="index">
                <div class="avartar">
                  <img :src="singer.picUrl" alt="">
                </div>
                <div class="name">{{singer.name}}</div>
                <div class="collect">收藏</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import api from '@/api/index'
import BScroll from 'better-scroll';
export default {
  created(){
      this.getHotSinger();
  },
  data() {
    return {
      menus:[],
      scrollY:0, //右侧列表滑动的y轴坐标
      rightLiTops:[] //所有分类头部位置
    }
  },
  methods:{
    getHotSinger(){
      //获取热门歌手
      const params ={
        offset : 0,
        limit : 20
      }
      api.hotSinger(params).then( (res)=>{
        if(res.code === 200){
          this.menus = res.artists
          this.$nextTick( () => {
          //保证html渲染完成后才会执行
          this._initScrool();
        })
          console.log(this.menus)
        }
      })
    },
    _initScrool(){
       this.rightBscroll = new BScroll('.singer-wrapper',{
         click:true,
         probeType:3,   //在滚动中触发scroll 事件
         pullUpLoad: {
            threshold: 10
        },
         });
          //滑动的大小
        this.rightBscroll.on('scroll',pos =>{
          // console.log(pos);
          this.scrollY = Math.abs(Math.round(pos.y))
        })

        this.rightBscroll.on("pullingUp",function(){
        //alert('已到最底部');
        console.log('加载ajax数据');
        this.rightBscroll.finishPullUp();//可以多次执行上拉刷新
    });
        this.rightBscroll.refresh();
       }
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/function'
  .singer
    background-color #808c8c
    padding px2rem(20px) 0 0 0
    .wrapper
      .singer-wrapper
        height 100%
        flex 1 
        margin 0 px2rem(20px)
        ul,li
          padding:0
          margin:0
          list-style:none
          .singer-item
            .title
              background-color #fff
              color #cdcdcd
            .singer-box
              display flex
              padding px2rem(20px) 0
              justify-content center
              align-items center
              .avartar
                flex 0 0 px2rem(66px)
                height px2rem(66px)
                margin-right px2rem(20px)
                img 
                  width 100%
                  height 100%
                  border-radius 50%
              .name 
                flex 1 
              .collect
                flex 0 0 px2rem(80px)

</style>
