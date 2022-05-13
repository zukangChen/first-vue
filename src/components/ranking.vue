<template>
  <div class="ranking">
    <div class="ago" @click="ago">
      <img src="@/assets/arrow.png" alt="">
      <div class="name">
        排行榜
      </div>
    </div>
    <div class="wrapper">
      <div class="title">官方榜</div>
      <ul>
        <li v-for="(item,index) in ranks" :key="index" @click="rankingDetail(item)">
          <div class="left">
            <img :src="item.coverImgUrl" alt="">
          </div>
          <div class="right">
            <ul>
              <li v-for="(song,index) in item.tracks" :key="index" v-show="index<3">
                <div class="name">
                  {{index+1}}.{{song.name}}-{{song.ar[0].name}}
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data () {
    return {
      id : 0,
      ranks : []
    }
  },
  methods:{
    //返回
    ago(){
      this.$router.push({ path: "/" });
    },
    //进入排行榜详情页面
    rankingDetail(item) {
      this.$router.push({ path: "/rankingDetail",query:{rank:item,type:'rank'} });
    },
    init(){
      for(let i=0;i<9;i++){
        api.getRanking({idx:this.id}).then( (res)=>{
          if(res.code === 200){
            this.ranks.push(res.playlist);
          }
        })
         this.id++;
      }

    }
  },
  created(){
    this.init();
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/function'
.ranking
  background-color #808c8c
  .ago 
    display: flex
    align-items: center
    img 
      margin-left px2rem(20px)
      width px2rem(66px)
      height px2rem(66px)
    .name 
      color: #fff;
      margin-left: px2rem(20px)
  .wrapper
    margin px2rem(20px) 0 px2rem(20px) px2rem(20px)
    .title
      color #fff
      font-size 18px
      margin-bottom px2rem(20px)
    ul,li
      list-style none
      margin 0
      padding 0
      li
        display flex
        margin-top px2rem(30px)
        .left
          flex 0 0 px2rem(240px)
          height px2rem(240px)
          img 
            width 100%
            height 100%
            border-radius 6px
        .right
          flex 1 
          ul
            li
              margin px2rem(20px) 0 
              .name
                color #fff
                margin-left px2rem(20px)

</style>
