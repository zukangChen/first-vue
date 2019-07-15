
<template>
  <div class="singer">  
    <div class="ago" @click="ago">
      <img src="@/assets/arrow.png" alt="">
      <div class="name">
        歌手
      </div>
    </div>
    <div class="wrapper">
      <div class="singer-wrapper" ref="singerWrapper">
        <ul ref="itemList">
          <li class="singer-item">
            <div class="title">热门歌手</div>
            <ul>
              <li class="singer-box" v-for="(singer,index) in menus" :key="index">
                <div class="avartar">
                  <img :src="singer.picUrl" alt="">
                </div>
                <div class="name">{{singer.name}}</div>
                <div class="collect">+收藏</div>
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
      offset : 0,//偏移量
      menus:[],
      satrY:0, 
      rightLiTops:[] //所有分类头部位置
    }
  },
  watch:{
    menus (){
       this.scroll = new BScroll(this.$refs.singerWrapper, {
        scrollY:true,
        scrollX:false,
        startY:this.satrY,
      // 上拉加载
      pullUpLoad: {
      // 当上拉距离超过30px时触发 pullingUp 事件
      threshold: -30
      },
    // 下拉刷新
    pullDownRefresh: {
      // 下拉距离超过30px触发pullingDown事件
      threshold: 30,
      // 回弹停留在距离顶部20px的位置
      stop: 20
      }
    })
    console.log(this.scroll)
    this.scroll.on('pullingUp', () => {
      this.satrY = this.scroll.startY;
      console.log('处理上拉加载操作')
      setTimeout(() => {
      // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
      this.getHotSinger();
      this.scroll.finishPullUp()
      }, 500)
    })
    this.scroll.on('pullingDown', () => {
      console.log('处理下拉刷新操作')
      setTimeout(() => {
      // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
      this.scroll.finishPullDown()
      }, 500)
    })
    }
  },
  mounted () {
 
  },
  methods:{
    getHotSinger(){
      //获取热门歌手
      const params ={
        offset : this.offset,
        limit : 15
      }
      api.hotSinger(params).then( (res)=>{
        if(res.code === 200){
          this.menus = [...this.menus,...res.artists];
          this.offset+=15;//每次偏移量增加15
        }
      })
    },
    ago(){
      this.$router.push({path:'/search'});
    }
    // _initScrool(){
    //    this.rightBscroll = new BScroll('.singer-wrapper',{
    //      click:true,
    //      probeType:3,   //在滚动中触发scroll 事件
    //      pullUpLoad: {
    //         threshold: 10
    //     },
    //      });
    //       //滑动的大小
    //     this.rightBscroll.on('scroll',pos =>{
    //       // console.log(pos);
    //       this.scrollY = Math.abs(Math.round(pos.y))
    //     })

    //     this.rightBscroll.on("pullingUp",function(){
    //     //alert('已到最底部');
    //     console.log('加载ajax数据');
    //     this.rightBscroll.finishPullUp();//可以多次执行上拉刷新
    //       });
    //     this.rightBscroll.refresh();
    //    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/function'
  .singer
    background-color #808c8c
    .ago
      display flex
      padding px2rem(40px) 0
      align-items center
      img 
        width px2rem(60px)
        height px2rem(60px)
        margin-left px2rem(25px)
      .name 
        color #fff
        font-size 20px
        margin-left px2rem(30px)
    .wrapper 
      // width 100%
      // height 100%
      .singer-wrapper
        height 100%
        flex 1 
        // padding  0 px2rem(20px)
        position: absolute;
        left: 0;
        top: 60px;
        overflow: hidden;
        // background-color #cdcdcd
        ul,li
          background-color #cdcdcd
          padding:0
          margin:0
          list-style:none
          .singer-item
            .title
              background-color rgba(255,255,255,0.9)
              color #cdcdcd
            .singer-box
              display flex
              padding px2rem(20px) 0
              justify-content center
              align-items center
              .avartar
                flex 0 0 px2rem(88px)
                height px2rem(88px)
                margin-right px2rem(20px)
                margin-left px2rem(20px)
                img 
                  width 100%
                  height 100%
                  border-radius 50%
              .name 
                flex 1 
                color #fff
              .collect
                flex 0 0 px2rem(100px)
                color #fff
                border 1px solid #fff
                text-align center
                font-size px2rem(30px)
                padding px2rem(8px)
                border-radius 10px
                margin-right px2rem(20px)

</style>