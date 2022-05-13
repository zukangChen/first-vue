<template>
  <div class="recVideo">
    <slot></slot>
   <div class="video" v-for="(item,index) in Video" :key="index"> 
      <div class="videoImg" v-if="currentVid != index">
        <img :src="item.cover" alt="" @click="playVideo(index)" >
      </div>
     <!-- 隐藏video标签，因为移动端点击视频播放时会自动弹出 -->
      <video :src="item.brs['240']" v-if="item.brs" :id="[ currentVid == index ? 'videoPlay' : '' ]"  v-show="currentVid == index"  class="video">您的浏览器不支持 video 视屏播放。</video>  
      <div class="play">
        <img src="@/assets/PLAY.png" alt="">
        <div class="count">{{item.playCount}}</div>
      </div>
      <div class="desc">
        <div class="title">
          {{item.name}}  
        </div>  
        <div class="avatar">
          <img :src="item.cover" alt="">
        </div>
      </div>  
      <div class="bottom">
        <div class="good">
          <img src="@/assets/good.png" alt="">  
          <div class="count">{{item.likeCount}}</div>
        </div>  
        <div class="comment">
          <img src="@/assets/comment.png" alt="">
          <div class="count">{{item.commentCount}}</div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
export default {
  data(){
    return {
        videoSrc: 'http://vodkgeyttp8.vod.126.net/cloudmusic/MjQ3NDQ3MjUw/89a6a279dc2acfcd068b45ce72b1f560/533e4183a709699d566180ed0cd9abe9.mp4?wsSecret=500d40862e93ba85307446e3a3dc312f&wsTime=1562675026',     //获取视频播放资源
        offset : 0,
        recVideos : [],
        mvVideos : [],
        // show : false,
        currentVid:null
    }
  },
  props:['Video'],
  methods: {
    //播放视频
    playVideo(index){
      var currentVideo;
      if(this.currentVid !== null){
        currentVideo = document.getElementById("videoPlay");
        currentVideo.pause();
        }
      const vid = index;
      this.currentVid = index;
      this.$nextTick(()=>{
        if (vid >= 0){
          // console.log(vid)
          console.log(document.getElementById("videoPlay"))
          currentVideo = document.getElementById("videoPlay");
          // console.log(currentVideo);
          currentVideo.play();
          this.currentVid = vid;
        }
      })
    },
  },
  created(){
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/function'
.recVideo
  h3
    color #fff
    margin-left px2rem(30px)
  .video
    width 96%
    padding px2rem(20px)
    position relative
    // height px2rem(600px)
    .videoImg
      
      width 100%
      height px2rem(500px)
      img 
        width 100%
        height 100%
        border-top-left-radius 10px
        border-top-right-radius 10px
    video 
      width 96%
      height px2rem(600px)
      border-top-left-radius 20px
      border-top-right-radius 20px
    .play
      display flex
      position absolute
      top px2rem(460px)
      margin-left px2rem(20px)
      img 
        width px2rem(46px)
        height px2rem(46px)
      .count
        color #fff
    .desc
      display flex
      align-items center
      justify-content center
      padding px2rem(20px)
      .title
        flex 1
        color #fff
      .avatar
        width  px2rem(80px)
        height px2rem(80px)
        img 
          width 100%
          height 100%
          border-radius 50%
    .bottom
      display flex
      .count
        margin-left px2rem(5px)
      .good,.comment
        color #fff
        display flex
        margin-right px2rem(80px)
        margin-left px2rem(20px)
        img 
          width px2rem(46px)
          height  px2rem(46px)
        
</style>
