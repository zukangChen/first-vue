<template>
  <div class="userSonglist">
    <div class="top">
      <img v-show="userDetail.profile" :src="profile.backgroundUrl" alt="">
      <div class="arrow" @click="goback">
        <img src="@/assets/arrow.png" alt />
      </div>
      <div class="user">
        <div class="avatar">
          <img v-show="userDetail.profile" :src="profile.avatarUrl" alt="">
        </div>
        <div class="username">{{profile.nickname}}</div>
        <div class="focus">关注{{profile.follows}}</div>
        <div class="fans">粉丝{{profile.followeds}}</div>
        <div class="bottom">
          <div class="grade">lv.{{userDetail.level}}</div>
          <div class="country">南昌市</div>
        </div>
      </div>
      <div class="edtior">
        <img src="@/assets/ed.png" alt="">
        <div class="ed">编辑</div>
      </div>
    </div>
    <div class="border">
      
    </div>
    <div class="wrapper">
      <div class="myself">
        <div class="title">歌单{{profile.playlistCount}}</div>
        <li v-for="(item,index) in songList" :key="index" v-show="index<17" @click="selectUserSong(item)">
          <div class="left">
            <img :src="item.coverImgUrl" alt="">
          </div>
          <div class="right">
            <div class="name">{{item.name}}</div>
            <div class="count">{{item.trackCount}}首,播放{{item.playCount}}次</div>
          </div>
        </li>
        <div class="title">收藏的歌单{{songList.length - profile.playlistCount}}</div>
        <li v-for="(item,index) in songList" :key="'info2-'+index" v-show="index>16" @click="selectUserSong(item)">
          <div class="left">
            <img :src="item.coverImgUrl" alt="">
          </div>
          <div class="right">
            <div class="name">{{item.name}}</div>
            <div class="count">{{item.trackCount}}首,播放{{item.playCount}}次</div>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return{

    }
  },
  computed:{
    ...mapGetters([
      'login',
      'userId',
      'profile',
      'songList',
      'userDetail',
    ]),
  },
  props:{
    // profile: {
    //   type : Object,
    // },
    // userDetail : {
    //   type : Object
    // },
    // songlist : {

    // }
  },
  methods:{
    //传入歌单id跳到歌单详情
    selectUserSong(item){
      this.$router.push({path:'/songdetail',query:{id:item.id,type:'user'}});
    },
    //返回
    goback() {
      this.$router.push({ path: "/" });
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/function'
.userSonglist
  .top
    position relative
    width 100%
    height px2rem(600px);
    border 1px solid #000
    box-sizing border-box
    img 
      width 100%
      height 100%
    .arrow
      position absolute
      top 5% 
      width px2rem(88px)
      height px2rem(88px)
      left 3%
      img 
        width 100%
        height 100%     
    .user
      position absolute
      top 30%
      left 2%
      color #fff
      .avatar
        width px2rem(160px)
        height px2rem(160px)
        img 
          width 100%
          height 100%
          border-radius 50%
      .username
        margin-top px2rem(30px)
      .focus
        display inline-block
        font-size 12px
        margin-right px2rem(30px)
        margin-bottom px2rem(10px)
      .fans
        display inline-block
        font-size 12px
      .bottom
        font-size 10px
        .grade,.country
          font-size 10px
          display inline-block
          text-align center
          background-color #808c8c
          width px2rem(100px)
          height px2rem(50px)
          line-height px2rem(50px)
          border-radius 36px
    .edtior
      position absolute
      top 30%
      right 5%
      color #fff
      display flex
      align-items center
      justify-content center
      width px2rem(200px)
      height px2rem(100px)
      background-color #c0c4c4
      border-radius 10%
      img 
        width px2rem(50px)
        height px2rem(50px)
  .border
    position relative
    width 100%
    height px2rem(80px)
    border-top 1px solid #000
    background-color rgba(128, 140, 140,1)
    top px2rem(-40px)
    border-top-right-radius:15px;
    border-top-left-radius:15px;
    box-sizing border-box
  .wrapper
    background-color #6b6b75
    position relative
    top px2rem(-41px)
    .myself
      .title
        margin-left px2rem(20px)
        color #fff
      li
        display flex
        margin-left px2rem(20px)
        margin-top px2rem(20px)
        .left
          flex 0 0 px2rem(100px)
          height px2rem(100px)
          margin-right px2rem(20px)
          img 
            width 100%
            height 100%
        .right 
          flex 1 
          .count
            font-size 12px
</style>
