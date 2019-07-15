<template>
  <div class="playBottom">
    <div class="left" :class="[rotate==true ? 'rotate' : 'pasued']" @click="fullPlay">
      <img :src="songAvtart"  alt="" >
    </div>
    <div class="middle" @click="fullPlay">
      <div class="songname">
        {{songname}} 
      </div>
      <div class="singer">
        {{singer}}
      </div>
    </div>
    <div class="right">
      <div class="play" @click="play" v-show="con">
        <img src="../assets/playMusic.png" alt="" ref="play">
      </div>
      <div class="play" @click="pause" v-show="!con">
        <img src="../assets/pause.png" alt="" ref="play">
      </div>
      <div class="list">
        <img src="../assets/list.png" alt="">
      </div>
    </div>
    <audio 
      src="http://m10.music.126.net/20190702194428/a50dfaf6aaef92c75687c9c6aaa6be1b/ymusic/525f/070b/515d/e5e0b730de0a888e415ef720fd087565.mp3"
      ref="audio"
      @ended="ended"
    ></audio>
  </div>
</template>

<script>
import api from "@/api/index";
import axios from 'axios'
export default {
  data () {
    return {
      songdata : [],
      songAvtart : 'https://p1.music.126.net/UKR7s-XmHXrBV-ZMcuKbxQ==/109951163520693205.jpg',
      songname : '可乐',
      singer : '赵紫骅',
      con : true,
      rotate : false,
    }
  },
  props:{
    songs : {
      type: Array,
      default : {}
    },
    index : {
      type: Number,
      default: ''
    }
  },
  methods:{
    //歌曲播放完自动播放下一首
    ended(){
      //子组件调用父组件的方法
      console.log('father');
      this.$parent.next();
    },
    //播放音乐
    play () {
      console.log(this.$refs.audio)
      this.$refs.audio.play();
      this.con = false;
      //图片旋转
      this.rotate = true;
      //告诉父组件正在播放
      this.$emit('play');
    },
    //暂停音乐
    pause(){
      this.con = true;
      this.$refs.audio.pause();
      //停止旋转
      this.rotate = false;
      //告诉父组件暂停播放
      this.$emit('pause');
    },
    //全屏播放
    fullPlay(){
      this.$emit('fullPlay');
    }
  },
  watch:{
    index (val){
      // console.log(this);
        const params = {
        id: this.songs[val].id
      };immediate: true;
    // console.log(params)
    // console.log(this.$refs.audio);
        // this.$refs.audio.play();
        this.play();
        api.SongUrl(params).then( (res)=>{
          this.songdata = res.data;
          this.$refs.audio.src = this.songdata[0].url;
          this.songAvtart = this.songs[val].al.picUrl;
          this.songname = this.songs[val].name;
          this.singer = this.songs[val].ar[0].name;
          console.log(res.data)
        }).then(()=>{
          // this.$refs.audio.play();
          this.play();
          this.$emit('play');
          // this.con = false;
        })
      },
  
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/function';
  .playBottom
    height px2rem(100px)
    position fixed
    bottom 0
    display flex
    background-color #868689
    
    .rotate
      animation rotate 20s linear infinite normal forwards
    .paused
      animation-play-state paused
    @keyframes rotate
      0%
        transform rotate(0)

      100%
        transform rotate(360deg)
        animation-fill-mode: forwards
    .left
      flex 0 0 px2rem(100px)
      margin 0 px2rem(10px)
      img 
        width 100%
        height 100%
        border-radius 50%
    .middle 
      flex 1
      overflow hidden
      .songname,.singer 
        overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
        width: px2rem(300px);/*需要配合宽度来使用*/
      .songname
        color #fff
      .singer
        color #d5d5d6
        font-size 10px
    .right
      display flex
      align-items center
      justify-content center
      .play,.list
        width px2rem(80px)
        height px2rem(80px)
        margin 0 px2rem(20px)
        img 
          width 100%
          height 100%
</style>
