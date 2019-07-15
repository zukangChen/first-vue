<template>
  <div class="wrapper">
    <!-- 歌单列表 -->
    <div class="test">
      敬请期待!
    </div>
    <div class="songDetail" v-show="!full" >
      <div class="arrow" @click="goback">
        <img src="@/assets/arrow.png" alt />
        <span>搜索</span>
      </div>
      <div class="palyall">
        <div class="play">
          <div class="icon">
            <img src="@/assets/PLAY.png" alt="">
          </div>
          <div class="title" @click="playall">播放全部</div>
        </div>

        <div class="song" v-for="(item,index) in songs" :key="index" @click="play(index)">
          <div class="left">
            <span class="num">{{index+1}}</span>
          </div>
          <div class="right">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artists[0].name}}</div>
          </div>
        </div>
      </div>
      <!-- 底部播放 -->
      <v-playBottom 
      :songs="songall" 
      :index="index" 
      @fullPlay="fullScreen" 
      @play="playRotate" 
      @pause="pauseRotate"
      ref="child" ></v-playBottom>
    </div>
    <!-- 全屏播放界面 -->
    <div class="fullPlay" v-show="full">
        <div class="top">
          <div class="left" @click="once">
            <img src="@/assets/arrow.png" alt />
          </div>
          <div class="middle">
            <div class="name">{{name}}</div>
            <div class="singer">{{singer}}</div>
          </div>
          <div class="right">
            <img src="@/assets/share.png" alt="">
          </div>
        </div>
        <div class="container">
          <div class="box" :class="[rotate ? 'change' : '']">
            <div class="box2" :class="[rotate ?  'change1' : '']">
              <img :class="[rotate ?  'rotate' : '']" :src="songAvtart" alt="">
            </div>
          </div>
        </div>
        <div class="pic">
          <div class="like">
            <img src="@/assets/like.png" alt="">
          </div>
          <div class="download">
            <img src="@/assets/download.png" alt="">
          </div>
          <div class="comment">
            <img src="@/assets/comment.png" alt="">
          </div>
          <div class="listdetail">
            <img src="@/assets/listdetail.png" alt="">
          </div>
        </div>
        <div class="constrol">
          <div class="before" @click="before">
            <img src="@/assets/before.png" alt="">
          </div>
          <div class="play" v-show="con" @click="playSing">
            <img src="@/assets/playMusic.png" alt="">
          </div>
          <div class="play" v-show="!con" @click="pauseSing">
            <img src="../assets/pause.png" alt="" ref="play">
          </div>
          <div class="next" @click="next">
            <img src="@/assets/next.png" alt="">
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import playBottom from "@/components/playBottom"
export default {
  data() {
    return {
      // songdetail: {},
      type : '',
      icons:[
          {url:require('@/assets/comment.png')},
          {url:require('@/assets/share.png')},
          {url:require('@/assets/download.png')},
          {url:require('@/assets/select.png')},
        ],
        songs : [],
        songall:[],
        index : 9999,
        full : false,//全屏播放
        con : true,
        rotate : false,//旋转
        name : '可乐',
        singer : '赵紫骅',
        songAvtart : 'https://p1.music.126.net/UKR7s-XmHXrBV-ZMcuKbxQ==/109951163520693205.jpg',
    };
  },
  props:{
    songdetail : {
      type : String
    }
  },
  name: "searchDetail",
  created() {
      api.getRecommendSongs( (res)=>{
        console.log(999)
        console.log(res);
        this.songs = res.recommend;
      })
      .then ( ()=>{
        console.log(this.songs.length)
        for(let i=0;i<this.songs.length;i++){
          console.log(this.songs[i].id) ;
          api.Song({ids:this.songs[i].id})
          .then( (res)=>{
            // this.songall = [...this.songall,...res.songs]
            // console.log(res.songs)
            this.songall.push(...res.songs);
            console.log(this.songall[i].id)
          })
        }
        // console.log(this.songall)
      })
  },
  methods: {
    //返回
    goback() {
      this.$router.push({ path: "/search" });
    },
    //点击列表中的歌传一个index给子组件
    play(index) {
      console.log(index)
      this.index = index;
      this.songAvtart = this.songall[index].al.picUrl;
      this.name = this.songall[index].name;
      this.singer = this.songall[index].ar[0].name;
    },
    //播放全部
    playall(){
      this.index = 0;
      this.songAvtart = this.songall[index].al.picUrl;
      this.name = this.songall[index].name;
      this.singer = this.songall[index].ar[0].name;
    },
    //全屏播放
    fullScreen  (){
      this.full = true;
    },
    //返回
    once(){
      this.full = false;
    },
    //控制旋转
    playRotate () {
      this.con = false;
      this.rotate = true;
    },
    //暂停旋转
    pauseRotate(){
     this.con = true;
     this.rotate = false;
    },
        //播放音乐
    playSing () {
      //console.log(this.$refs.child) 返回的是一个vue对象，所以可以直接调用其方法
      this.$refs.child.play();
      this.con = false;
      this.rotate = true;
    },
    //暂停音乐
    pauseSing(){
      //console.log(this.$refs.child) 返回的是一个vue对象，所以可以直接调用其方法
      this.$refs.child.pause();
      this.con = true;
      this.rotate = false;
    },
    //下一首
    next(){
      console.log('下一首');
      //判断是否为这个歌单的最后一首歌，是的话，下一首就为歌单的第一首
      // if(this.index ===(this.songdetail.trackCount-1)){
      if(this.index ===(this.songs.length-1)){
        this.index = 0;
      }else{
        this.index += 1;
      }
      this.songAvtart = this.songall[this.index].al.picUrl;
      this.name = this.songall[this.index].name;
      this.singer = this.songall[this.index].ar[0].name;
    },
    //上一首
    before (){
      console.log('上一首');
      //判断是否为这个歌单的第一首歌，是上一首就为歌单的最后一首
      if(this.index === 0){
        this.index = this.songs.length-1;
      }else{
        this.index -= 1;
      }
      this.songAvtart = this.songall[this.index].al.picUrl;
      this.name = this.songall[this.index].name;
      this.singer = this.songall[this.index].ar[0].name;
    }
  },
  components:{
    "v-playBottom" : playBottom
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/css/function';
#app
  width 100%
  height 100%
  position relative
  .wrapper
    width 100%
    height 100%
    .test
      position absolute
      top 50%
      left 35%
      font-size 26px
      color red
    .songDetail 
      background-color: #808c8d
      .arrow 
        display: flex
        align-items: center
        span 
          color: #fff;
          margin-left: px2rem(20px)
      .palyall
        .play
          display flex
          align-items center
          justify-content center
          border-radius 20px
          .icon
            margin px2rem(20px)
            width px2rem(66px)
            height px2rem(66px)
            flex 0 0 px2rem(66px)
            img 
              width 100%
              height 100%
          .title
            flex 1 
            color #fff
            line-height px2rem(66px)
            span 
              color #d5d5d6
              font-size px2rem(36px)
      .song
        display flex
        padding px2rem(10px) 0 
        .left
          flex 0 0 px2rem(100px)
          text-align center
          line-height px2rem(100px)
          color #d5d5d6
        .right
          flex 1 
          .name,.singer
            overflow: hidden;/*超出部分隐藏*/
            text-overflow:ellipsis;/* 超出部分显示省略号 */
            white-space: nowrap;/*规定段落中的文本不进行换行 */
            width: px2rem(600px);/*需要配合宽度来使用*/
          .name
            color #fff
          .singer
            color #d5d5d6
            font-size px2rem(28px)
    .fullPlay
      position absolute
      background-color #cdcdcd
      left 0
      right 0
      top 0
      bottom 0
      .top
        display flex
        align-items center
        justify-content center
        position relative
        .left
          flex 0 0 px2rem(100px)
        .middle
          flex 1 
          .name,.singer
            color #fff
            overflow: hidden;/*超出部分隐藏*/
            text-overflow:ellipsis;/* 超出部分显示省略号 */
            white-space: nowrap;/*规定段落中的文本不进行换行 */
            width: px2rem(600px);/*需要配合宽度来使用*/
          .singer
            color #808080
            font-size px2rem(28px)
        .right
          flex 0 0 px2rem(100px)
          position absolute
          right px2rem(10px)
          img 
            width 100%
            height 100%
      .container
        margin px2rem(120px) 0
        width 100%
        height 58%
        position relative
        display flex
        align-items center
        justify-content center
        .box
          width 50%
          height 50%
          background-color #cdcdcd
          position absolute
          box-sizing border-box
          border-radius 50%
          display flex
          align-items center
          justify-content center
          box-sizing border-box
        .change
          animation bigger 3s linear infinite
          .box2
            width px2rem(432px)
            height px2rem(432px)
            border-radius 50%
            display flex
            align-items center
            justify-content center
            border 3px solid #000
          .change1
            animation bigger2 4s linear  infinite
            @keyframes bigger2
              0%
                width px2rem(432px)
                height px2rem(432px)
                border 1px solid rgba(255,255,255,1)
              50%
                width px2rem(532px)
                height px2rem(532px)
                border 1px solid rgba(255,255,255,0.4)
              100%
                width px2rem(632px)
                height px2rem(632px)
                border 1px solid rgba(255,255,255,0)
        @keyframes bigger
            0%
              width px2rem(432px)
              height px2rem(432px)
              border 1px solid rgba(255,255,255,0)
            50%
              width px2rem(632px)
              height px2rem(632px)
              border 1px solid rgba(255,255,255,0.9)
            100%
              width px2rem(832px)
              height px2rem(832px)
              border 1px solid rgba(255,255,255,0.3)
          img 
            width px2rem(432px)
            height px2rem(432px)
            border-radius 50%
            overflow: hidden;
            border 6px solid #aaa
            box-sizing border-box
          .rotate
            animation rotate 20s linear infinite
          @keyframes rotate
            0%
              transform rotate(0)

            100%
              transform rotate(360deg)

      .pic
        display flex
        align-items center
        justify-content space-around
      .constrol
        display flex
        align-items center
        justify-content center
        position absolute
        width 100%
        bottom px2rem(10px)
        .play
          width px2rem(100px)
          height px2rem(100px)
          margin 0 px2rem(100px)
          img 
            width 100%
            height 100%
</style>
