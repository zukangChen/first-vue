<template>
  <div class="rankingDetail">
    <!-- 歌单列表 -->
    <div class="songdetail" v-show="!full" >
      <div class="arrow" @click="goback" v-if="type=='list'">
        <img src="@/assets/arrow.png" alt />
        <span>歌单</span>
      </div>
      <!-- <div class="arrow" @click="gabacktwo"  v-else-if="type!='list'">
        <img src="@/assets/arrow.png" alt />
        <span>歌单</span>
      </div> -->
      <div class="arrow" @click="gabackthree"  v-else-if="type=='rank'">
        <img src="@/assets/arrow.png" alt />
        <span>排行榜</span>
      </div>
      <div class="song-detail">
        <div class="left">
          <img :src="songdetail.coverImgUrl" alt="">
          <div class="top">
            <img src="../assets/PLAY.png" alt="">
            <span>{{songdetail.playCount}}</span>
          </div>
        </div>
        <div class="right">
          <div class="title">{{songdetail.name}}</div>
          <div class="author">
            <div class="author-avatar">
              <img :src="songdetail.creator.avatarUrl" alt="">
            </div>
            <span class="author-name" >{{songdetail.creator.nickname}}</span>
          </div>
          <div class="desc">{{songdetail.description}}</div>
        </div>
      </div>
      <div class="picture">
        <div class="icon" v-for="(item,index) in icons" :key="index">
          <div class="ic">
            <img :src="item.url" alt="">
          </div>
        </div>
      </div>
      <div class="detail">
        <div class="icon1">{{songdetail.commentCount}}</div>
        <div class="icon2">{{songdetail.shareCount}}</div>
        <div class="icon3">下载</div>
        <div class="icon4">多选</div>
      </div>
      <div class="palyall">
        <div class="play">
          <div class="icon">
            <img src="@/assets/PLAY.png" alt="">
          </div>
          <div class="title" @click="playall">播放全部<span>({{songdetail.trackCount}}首)</span></div>
        </div>

        <div class="song" v-for="(item,index) in songs" :key="index" @click="play(index)">
          <div class="left">
            <span class="num">{{index+1}}</span>
          </div>
          <div class="right">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.al.name}}</div>
          </div>
        </div>
      </div>
      <!-- 底部播放 -->
      <v-playBottom 
      :songs="songs" 
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
      songdetail: {},
      type : '',
      icons:[
          {url:require('@/assets/comment.png')},
          {url:require('@/assets/share.png')},
          {url:require('@/assets/download.png')},
          {url:require('@/assets/select.png')},
        ],
        songs : [],
        index : 9999,
        full : false,//全屏播放
        con : true,
        rotate : false,//旋转
        name : '可乐',
        singer : '赵紫骅',
        songAvtart : 'https://p1.music.126.net/UKR7s-XmHXrBV-ZMcuKbxQ==/109951163520693205.jpg',
    };
  },
  name: "songdetail",
  created() {
    this.type=this.$route.query.type;
    console.log(this.type);
    this.songdetail = { ...this.songdetail, ...this.$route.query.rank };
    this.songs = this.$route.query.rank.tracks
    // console.log(this.songdetail.tracks);
  },
  methods: {
    //返回
    goback() {
      this.$router.push({ path: "/" });
    },
    //返回歌单广场
    gabacktwo(){
      this.$router.push({ path: "/songSquare/songSquare" });
    },
    //返回排行榜
    gabackthree(){
      this.$router.push({ path: "/ranking" });
    },
    //点击列表中的歌传一个index给子组件
    play(index) {
      this.index = index;
      this.songAvtart = this.songs[index].al.picUrl;
      this.name = this.songs[index].name;
      this.singer = this.songs[index].al.name;
    },
    //播放全部
    playall(){
      this.index = 0;
      this.songAvtart = this.songs[this.index].al.picUrl;
      this.name = this.songs[this.index].name;
      this.singer = this.songs[this.index].al.name;
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
      console.log('xioqiq')
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
      if(this.index ===(this.songdetail.trackCount-1)){
        this.index = 0;
      }else{
        this.index += 1;
      }
      this.songAvtart = this.songs[this.index].al.picUrl;
      this.name = this.songs[this.index].name;
      this.singer = this.songs[this.index].al.name;
    },
    //上一首
    before (){
      console.log('上一首');
      //判断是否为这个歌单的最后一首歌，是下一首就为歌单的第一首
      if(this.index === 0){
        this.index = this.songdetail.trackCount-1;
      }else{
        this.index -= 1;
      }
      this.songAvtart = this.songs[this.index].al.picUrl;
      this.name = this.songs[this.index].name;
      this.singer = this.songs[this.index].al.name;
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
  .rankingDetail
    width 100%
    height 100%
    .songdetail 
      background-color: #808c8d
      .arrow 
        display: flex
        align-items: center

        span 
          color: #fff;
          margin-left: px2rem(20px)
      .song-detail
        display flex
        padding px2rem(40px) px2rem(20px) px2rem(40px) px2rem(20px)
        .left
          flex 0 0 px2rem(300px)
          position relative
          img 
            width 100%
            height 100%
            border 1px solid #cdcdcd
            border-radius 10px
          .top
            position absolute
            top px2rem(10px)
            right px2rem(10px)
            display flex
            justify-content center
            align-items center
            span 
              font-size px2rem(24px)
              color #fff
        .right
          margin-left px2rem(30px)
          .title,.desc
            color #fff
            font-size px2rem(40px)
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          .author
            display flex
            margin px2rem(30px) 0
            .author-avatar
              width px2rem(66px)
              height px2rem(66px)
              img 
                width 100%
                height 100%
                border-radius 50%
            span 
              color #d5d5d6
              margin-left px2rem(5px)
          .desc
            color #d5d5d6
            font-size px2rem(20px)
      .picture,.detail
        display flex
        flex-flow:row wrap;
        justify-content: space-between;
        .icon
          width px2rem(66px)
          height px2rem(66px)
          .ic
            width px2rem(66px)
            height px2rem(66px)
            img 
              width 100%
              height 100%
        .icon1,.icon2,.icon3,.icon4
          width px2rem(100px)
          height px2rem(100px)
          line-height px2rem(100px)
          text-align center
      .picture
        padding px2rem(20px) px2rem(60px) px2rem(2px) px2rem(60px)
      .detail
        padding 0 px2rem(40px)
        color #fff
      .palyall
        // border 1px solid #5c5047
        // border-radius 20px
        .play
          display flex
          align-items center
          justify-content center
          // background-color #5c5047
          border-top 1px solid #6c7e7e
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
