<template>
  <div class="singer">
    <div class="wrapper">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(item,index) in menus" :key="index"
            :class="{current: index === currentIndex}"
            @click="clickList(index)"
            ref="menuList">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="singer-wrapper" ref="singerWrapper">
        <ul ref="itemList">
          <li class="singer-item" v-for="(item,index) in menus" :key="index" ref="singerList">
            <div class="title">{{item.name}}</div>
            <ul>
              <li class="singer-box" v-for="(singer,index1) in item.artists" :key="index1">
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
      this.getChinese();
  },
  mounted(){
    this._initScrool();
    this._calculateHeight();
  },
  data() {
    return {
      menus:[
        {
          name:'热门歌手',
        },
        {
          name:'华语男歌手'
        }
      ],
      scrollY:0, //右侧列表滑动的y轴坐标
      rightLiTops:[] //所有分类头部位置
    }
  },
  watch:{
    menus(){
      //监听数据
      this.$nextTick(() =>{
        //左右两边滚动
        this. _initBScroll();
　　　　　　//右边列表高度
　　　　　　this._initRightHeight()
      })
    }
  },
  methods:{
    getHotSinger(){
      //获取热门歌手
      const params ={
        offset : 0,
        limit : 10
      }
      api.hotSinger(params).then( (res)=>{
        if(res.code === 200){
          console.log(res);
          this.menus[0].artists = res.artists
          console.log(this.menus)
        }
      })
    },
    getChinese(){
      //获取华语男歌手
      const params ={
        cat : 1001,
        limit : 10
      }
      api.getSinger(params).then( (res)=>{
        if(res.code === 200){
          console.log(res);
          this.menus[1].artists = res.artists
          console.log(this.menus)
        }
      })
    },
    // 给页面加滑动效果
    _initScrool () {
      this.leftBscroll = new BScroll(this.$refs.menuWrapper, {
        click:true
      })
        this.rightScroll = new BScroll(this.$refs.singerWrapper, {
        click:true,
        probeType:3
      })
      //监听右边滚动事件
      this.rightBscroll.on('scroll',(pos) => {
        this.scrollY = Math.abs(pos.y);
        console.log(this.scrollY)
      })
    },
//求出右边列表的高度
    _initRightHeight(){
      let itemArray=[]; //定义一个伪数组
      let top = 0;
      itemArray.push(top)
      //获取右边所有li的礼
      let allList = this.$refs.itemList.getElementsByClassName('singer-item');
      //allList伪数组转化成真数组
      Array.prototype.slice.call(allList).forEach(li => {
        top += li.clientHeight; //获取所有li的每一个高度
        itemArray.push(top)
      });
      this.rightLiTops = itemArray;
      console.log(this.rightLiTops)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/function'
  .singer
    background-color #808c8c
    padding px2rem(20px) 0 0 0
    .wrapper
      display flex
      .menu-wrapper
        border 1px solid #000
        height 100%
        ul,li
          padding:0
          margin:0
          list-style:none
      .menu-wrapper
        flex 0 0 px2rem(220px)
        .menu-item
          text-align center
          padding px2rem(20px)
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
