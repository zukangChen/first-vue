<template>
  <div class="nav">
    <div class="icon-editor">
      <img src="@/assets/editor.png" alt="">
    </div>
    <ul class="nav-list">
      <li class="item" 
      v-for="(item,index) in navList" :key="index" 
      :class="{'active': 
      nowIndex===index}" 
      @click="tabClick(index)">
        {{item.name}}
      </li>
    </ul>
    <div class="search" @click="search">
      <!-- <i class="el-icon-search icon-search"></i> -->
      <img class="icon-search" src="@/assets/search.png" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VueRouter from 'vue-router';

  export default {
    data() {
      return {
        navList: [
          {name: '我的'},
          {name: '发现'},
          {name: '朋友'},
          {name: '视频'},
        ],
        nowIndex: 1
      }
    },
    mounted() {
      this.$nextTick(() => {
        // 初始化，保证刷新页面后内容区和导航键一致
        this.initPage();
      });
      // 接收swiper组件发射的index进行导航按钮切换高亮和更新模板地址
      this.$root.eventHub.$on('slideTab', this.slideTab);
    },
    methods: {
      //发送初始index
      initPage() {
        this.nowIndex = this.$route.path === '/one' ? 0 : this.$route.path === '/two' ? 1 : this.$route.path === '/three' ? 2 : this.$route.path === '/four' ? 3 :1;
      },
      tabClick(index) {
        this.nowIndex = index;
        // 点击导航按钮时向swiper组件发射index
        this.$root.eventHub.$emit('changeTab', index);
      },
      slideTab(index) {
        this.nowIndex = index;
        let router = new VueRouter();
        let href = index === 0 ? '/one' : index === 1 ? '/two' : index === 2 ? '/three' : index === 3 ? '/four' : '/two';
        // 利用路由的push方法更新路径地址
        router.push(href);
      },
      //点击search图标去到搜索页面
      search(){
        this.$router.push({path:'/search'});
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/css/function'
  .nav
    background-color #808c8c
    padding px2rem(36px)
    display flex
    align-items center
    justify-content center
    ul,li
      padding:0 
      margin:0 
      list-style:none
    .icon-editor
      flex 0 0 px2rem(58px)
      width px2rem(58px)
      height px2rem(58px)
      margin-right px2rem(20px)
      img 
        width 100%
        height 100%
    .search
      flex 0 0 px2rem(58px)
      width px2rem(58px)
      height px2rem(58px)
      margin-left px2rem(20px)
      .icon-search 
        width 100%!important
        height 100%!important      
    .nav-list
      flex 1
      overflow: hidden
      display flex
      align-items center
      justify-content center
      .item
        flex 1
        text-align: center
        height: px2rem(48px)
        line-height: px2rem(48px)
        color #d4dadb
        &.active
          color #feffff
          font-size 20px
</style>
