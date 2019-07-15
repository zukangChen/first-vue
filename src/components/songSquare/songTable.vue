<template>
  <div class="songlist">
    <div class="wrapper">
      <div class="song-item" v-for="(songlist,index) in songlist" :key="index" @click="selectSongList(songlist)">
        <div class="songlist-box" >
          <img class="bg" :src="songlist.coverImgUrl" alt="">
          <div class="top">
            <img src="@/assets/PLAY.png" alt="">
            <span>{{songlist.playCount}}</span>
          </div>
      </div>
      <div class="name">{{songlist.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  props:{
    songlist :{
      type : Array
    }
  },
  // computed:{
  //   ...mapGetters([
  //     'songlist',
  //     'songs'
  //   ]),
  // },

  methods:{
 
    //跳到歌单详情页
    selectSongList (item) {
      this.$router.push({path:'/songdetail',query:{id:item.id,type:'songSquare'}});
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/function'

.songlist
  margin-top px2rem(64px)
  .wrapper
    position relative
    // padding px2rem(20px) px2rem(20px) px2rem(100px) px2rem(10px)
    display flex
    flex-flow:row wrap;
    justify-content: space-around;
    .song-item
      .songlist-box
        position relative
        width px2rem(230px)
        height px2rem(230px)
        color #fff
        // margin px2rem(20px) px2rem(20px) px2rem(100px) px2rem(20px)
        .bg
          width 100%
          height 100%
          border 1px solid #fff
          border-radius 10px
        .top
          position absolute
          top 0
          right px2rem(10px)
          display flex
          justify-content center
          align-items center
          span 
            font-size px2rem(24px)
            line-height 1
  .name
    width px2rem(250px)
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color #fff
    font-size px2rem(26px)
    margin px2rem(20px) 0 px2rem(50px) 0
</style>
