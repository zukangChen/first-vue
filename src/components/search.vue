<template>
  <div class="serch">
    <div class="header">
      <div class="arrow" @click="goback">
        <img src="@/assets/arrow.png" alt />
      </div>
      <div class="input">
        <input type="text" placeholder="可乐" v-model="searchName">
      </div>
      <div class="search-btn">
        <button @click="searchSong">搜索</button>
      </div>
      <div class="singer" @click="gotoSinger">
        <img src="@/assets/people.png" alt="">
      </div>
    </div>
    <div class="history">
      <div class="top">
        <div class="search-history">历史记录</div>
        <div class="icon" @click="deleteSearchHistory">
          <img src="@/assets/delete.png" alt="">
        </div>
      </div>
      <div class="notsou" v-show="!sou">
        当前没有搜索记录
      </div>
      <div class="sou">
        <div class="item" v-for="(item,index) in searchHistory" :key="index">
          <div class="name" v-if="index<8" @click="searchAgin(item)">
            {{item}}
          </div>
        </div>
      </div>
    </div>
    <div class="hot-search">
      <div class="title">热搜榜</div>
      <ul>
        <li v-for="(item,index) in hots" :key="index" @click="searchHot(item.first)">
          <div class="left">{{index+1}}</div>
          <div class="right">
            <div class="header">
              <div class="name">{{item.first}}</div>
              <div class="hot-number">138792{{index}}</div>
            </div>
            <div class="bottom">聆听的份宁静</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      hots : [],
      searchName : '可乐',
      sou:true,
    }
  },
  computed:{
    ...mapGetters([
      'searchHistory'
    ]),
  },
  created(){
    this.gethot();
  },
  methods:{
    goback() {
      this.$router.push({ path: "/" });
    },
    //获取热搜榜
    gethot(){
      api.HotSearchKey().then( (res)=>{
        console.log(res.result.hots);
        this.hots = res.result.hots;
      })
    },
    //搜索歌曲
    searchSong(){
      this.$router.push({ path: "/searchDetail",query:{keywords:this.searchName} });
      //将搜索的关键词放到vuex仓库中
       this.$store.dispatch("saveSearchHistory",this.searchName)
    },
    //删除搜索记录
    deleteSearchHistory(){
      console.log('delete')
      this.$store.dispatch("deleteSearchHistory");
      this.sou = false;
    },
    //点击搜索历史中的关键词搜索
    searchAgin(item){
      this.searchName = item;
      this.searchSong();
    },
    //点击热搜榜搜素
    searchHot(item){
      console.log(item)
      this.searchName = item;
      this.sou = true;
      this.searchSong();
    },
    //点击去到歌手页面
    gotoSinger(){
      this.$router.push({path:'/singer'})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/function'
.serch
  background-color #839193
  padding px2rem(20px) px2rem(20px) 0 px2rem(20px) 
  .header
    display flex
    align-items center
    .arrow
      flex 0 0 px2rem(66px)
    .input
      flex 1
      input 
        width 95%
        height 100%
        margin 0 px2rem(10px)
        border 1px solid #fff
        font-size 16px
        border-radius px2rem(20px)
        padding px2rem(5px) px2rem(10px)
        box-sizing border-box
    .search-btn
      button 
        border 1px solid #cdcdcd
        border-radius 10px
        margin-right px2rem(10px)
  .history
    margin-top px2rem(20px) 0
    padding px2rem(20px) 0
    .top
      display flex
      align-items center
      .search-history
        color #fff
        flex 1
      .icon 
        flex 0 0 px2rem(60px)
    .notsou
      color #fff
    .sou
      display flex
      flex-wrap: wrap
      align-items center
      height 100px
      overflow hidden
      .item
        .name
          border 1px solid #fff
          text-align center
          border-radius 10px
          box-sizing border-box
          font-size 12px
          padding px2rem(20px)
          color #fff
          margin px2rem(20px)
  .hot-search
    .title
      color #fff
      margin-top px2rem(30px)
    ul,li
      padding:0
      margin:0
      list-style:none
      li
        display flex
        align-items center
        margin px2rem(20px) 0
        .left
          flex 0 0 px2rem(60px)
          color #9caaac
        .right
          flex 1 
          .header
            .name
              color #fff
            .hot-number
              color #9caaac
              margin-left px2rem(10px)
          .bottom
            color #b8c0c2
            font-size 14px
</style>
