<template>
  <div class="one">
    <div class="login" v-if="!login">
      <div class="bg">
        <img src="@/assets/7.jpg" alt="">
      </div>
      <!-- <div class="arrow" @click="goback">
        <img src="@/assets/arrow.png" alt />
      </div> -->
      <div class="user">
        <input type="text" v-model="phoneNumeber" placeholder="请输入手机号">
      </div>
      <div class="password">
        <input type="text" v-model="password" placeholder="请输入密码">
      </div>
      <div class="btn">
        <div class="button" @click="phoneLogin">手机号登录</div>
      </div>
    </div>
    <div class="wrapper" v-if="login">
      <v-userSonglist :userDetail="userDetail" :profile="profile" :songlist="songlist"></v-userSonglist>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import api from '@/api/index'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import userSonglist from './userSonglist'
  export default {
    data () {
      return {
        phoneNumeber : null,
        password : null,
        profile : {}, //用户信息
        songlist : {},//用户歌单
        userDetail : {}, //用户详情
      }
    },
    computed:{
      ...mapGetters([
        'login',
        'userId',
      ]),
    },
    created(){
     
    },
    components:{
      'v-userSonglist' : userSonglist
    },
    methods:{
      //登录
      phoneLogin () {
        const params = {
          phone : this.phoneNumeber,
          password : this.password
        }
        api.phoneLogin(params).then( (res) =>{
          if (res.code === 200) {
            // console.log(res);
            //把登录状态变为true
            this.$store.dispatch("updateLogin",true);
            //把userId存到vueX
            this.$store.dispatch("saveUserId",res.profile.userId);
            //把用户信息保存到vuex
            this.$store.dispatch("saveProfile",res.profile);
            this.profile = res.profile;
          }
        }).catch( ()=>{alert('输入的手机号或密码错误')})
        .then( (res)=>{
          this.getUserSonglist();
          this.getUserDetail();
        })
      },
      //返回
      // goback() {
      //   this.$router.push({ path: "/" });
      // },
      //登录后根据用户id获取用户歌单
      getUserSonglist(){
        const params ={
          uid: this.userId
        }
        api.getUserSonglist(params).then( (res)=>{
          console.log(res);
           this.songlist = res.playlist;
          //把用户歌单保存到vuex
          this.$store.dispatch("saveSonglist",res.playlist);
        })
      },
      //登录后根据用户id获取用户详情
      getUserDetail(){
        const params ={
          uid: this.userId
        }
        api.getUserDetail(params).then( (res)=>{
          console.log(res);
          this.userDetail = res;
          //把用户详情保存到vuex
          this.$store.dispatch("saveUserDetail",res);
        })
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/css/function'
  .one
    left 0
    bottom 0
    position relative
    .login
      width 100%
      height 600px
      position relative
      .arrow
        position absolute
        top 5% 
        width px2rem(88px)
        height px2rem(88px)
        left 3%
        img 
          width 100%
          height 100%   
      .bg
        width 100%
        height 600px
        img
          width 100%
          height 100%
      .user,.password
        display flex
        justify-content center
        padding 0 px2rem(20px)
        input
          width 90%
          border: 0  // 去除未选中状态边框
          outline: none // 去除选中状态边框
          background-color: rgba(0, 0, 0, 0)// 透明背景
          border-bottom 1px solid #cdcdcd
          height px2rem(66px)
          color #000
          padding 0 px2rem(20px)
      .user
        input 
          position absolute
          top 15%
      .password
        input 
          position absolute
          top 25%
      .btn
        display flex
        justify-content center
        .button 
          top 50%
          position absolute
          width 90%
          background-color red
          border-radius 16px
          box-sizing border-box
          color #fff
          height px2rem(86px)
          text-align center
          line-height px2rem(86px)
</style>
